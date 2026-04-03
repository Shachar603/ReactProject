using System.Data;
using Microsoft.Data.SqlClient;

namespace ReactServerSide.BL
{
    public class DBServices
    {
        private readonly string _connectionString;

        public DBServices(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("myProjDB")
                ?? throw new InvalidOperationException("Connection string 'myProjDB' was not found.");
        }

        private SqlConnection OpenConnection()
        {
            SqlConnection con = new SqlConnection(_connectionString);
            con.Open();
            return con;
        }

        public AuthenticatedUser? AuthenticateUser(string email, string password)
        {
            using SqlConnection con = OpenConnection();

            const string instructorSql = @"
                SELECT TOP 1 Id, Email, Role, FirstName, LastName
                FROM dbo.Instructors
                WHERE LOWER(Email) = @Email AND PasswordHash = @PasswordHash AND IsActive = 1;";

            using (SqlCommand instructorCmd = new SqlCommand(instructorSql, con))
            {
                instructorCmd.Parameters.AddWithValue("@Email", email);
                instructorCmd.Parameters.AddWithValue("@PasswordHash", password);

                using SqlDataReader reader = instructorCmd.ExecuteReader();
                if (reader.Read())
                {
                    return new AuthenticatedUser
                    {
                        Id = reader.GetInt32(0),
                        Email = reader.GetString(1),
                        Role = reader.GetString(2),
                        UserType = "Instructor",
                        FullName = $"{GetNullableString(reader, 3)} {GetNullableString(reader, 4)}".Trim()
                    };
                }
            }

            const string parentSql = @"
                SELECT TOP 1 Id, Email, FirstName, LastName
                FROM dbo.Parents
                WHERE LOWER(Email) = @Email AND PasswordHash = @PasswordHash AND IsActive = 1;";

            using (SqlCommand parentCmd = new SqlCommand(parentSql, con))
            {
                parentCmd.Parameters.AddWithValue("@Email", email);
                parentCmd.Parameters.AddWithValue("@PasswordHash", password);

                using SqlDataReader reader = parentCmd.ExecuteReader();
                if (reader.Read())
                {
                    return new AuthenticatedUser
                    {
                        Id = reader.GetInt32(0),
                        Email = reader.GetString(1),
                        Role = "Parent",
                        UserType = "Parent",
                        FullName = $"{GetNullableString(reader, 2)} {GetNullableString(reader, 3)}".Trim()
                    };
                }
            }

            return null;
        }

        public bool IsManagerCredentialsValid(string email, string password)
        {
            using SqlConnection con = OpenConnection();

            const string managerSql = @"
                SELECT COUNT(1)
                FROM dbo.Instructors
                WHERE LOWER(Email) = @Email AND PasswordHash = @PasswordHash AND Role = 'Manager' AND IsActive = 1;";

            using SqlCommand cmd = new SqlCommand(managerSql, con);
            cmd.Parameters.AddWithValue("@Email", email);
            cmd.Parameters.AddWithValue("@PasswordHash", password);

            int count = Convert.ToInt32(cmd.ExecuteScalar());
            return count > 0;
        }

        public bool EmailExists(string email)
        {
            using SqlConnection con = OpenConnection();

            const string existsSql = @"
                SELECT CASE
                    WHEN EXISTS (SELECT 1 FROM dbo.Instructors WHERE LOWER(Email) = @Email)
                      OR EXISTS (SELECT 1 FROM dbo.Parents WHERE LOWER(Email) = @Email)
                    THEN 1 ELSE 0 END;";

            using SqlCommand cmd = new SqlCommand(existsSql, con);
            cmd.Parameters.AddWithValue("@Email", email);

            int exists = Convert.ToInt32(cmd.ExecuteScalar());
            return exists == 1;
        }

        public int CreateInstructor(string email, string password, string firstName, string lastName)
        {
            using SqlConnection con = OpenConnection();

            const string insertSql = @"
                INSERT INTO dbo.Instructors (Email, PasswordHash, Role, IsActive, CreatedAt, FirstName, LastName)
                VALUES (@Email, @PasswordHash, 'Instructor', 1, SYSUTCDATETIME(), @FirstName, @LastName);
                SELECT CAST(SCOPE_IDENTITY() AS int);";

            using SqlCommand cmd = new SqlCommand(insertSql, con);
            cmd.Parameters.AddWithValue("@Email", email);
            cmd.Parameters.AddWithValue("@PasswordHash", password);
            cmd.Parameters.AddWithValue("@FirstName", firstName);
            cmd.Parameters.AddWithValue("@LastName", lastName);

            return Convert.ToInt32(cmd.ExecuteScalar());
        }

        public int CreateParent(string email, string password, string firstName, string lastName, string? phone)
        {
            using SqlConnection con = OpenConnection();

            const string insertSql = @"
                INSERT INTO dbo.Parents (Email, PasswordHash, FirstName, LastName, Phone, IsActive, CreatedAt)
                VALUES (@Email, @PasswordHash, @FirstName, @LastName, @Phone, 1, SYSUTCDATETIME());
                SELECT CAST(SCOPE_IDENTITY() AS int);";

            using SqlCommand cmd = new SqlCommand(insertSql, con);
            cmd.Parameters.AddWithValue("@Email", email);
            cmd.Parameters.AddWithValue("@PasswordHash", password);
            cmd.Parameters.AddWithValue("@FirstName", firstName);
            cmd.Parameters.AddWithValue("@LastName", lastName);
            cmd.Parameters.Add("@Phone", SqlDbType.NVarChar).Value = string.IsNullOrWhiteSpace(phone)
                ? DBNull.Value
                : phone.Trim();

            return Convert.ToInt32(cmd.ExecuteScalar());
        }

        private static string GetNullableString(SqlDataReader reader, int index)
        {
            return reader.IsDBNull(index) ? string.Empty : reader.GetString(index);
        }
    }

    public class AuthenticatedUser
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string UserType { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
    }
}
