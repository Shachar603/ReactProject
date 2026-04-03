using System.Data;
using Microsoft.Data.SqlClient;

namespace ReactServerSide.DAL
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

        public AuthenticatedUser? PostAuthenticateUser(string email, string password)
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

        public bool PostIsManagerCredentialsValid(string email, string password)
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

        public bool PostEmailExists(string email)
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

        public int PostCreateInstructor(string email, string password, string firstName, string lastName)
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

        public int PostCreateParent(string email, string password, string firstName, string lastName, string? phone)
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

        public List<ChildRecord> GetChildren(bool includeInactive = false)
        {
            using SqlConnection con = OpenConnection();

            const string sql = @"
                SELECT
                    c.Id,
                    c.ParentId,
                    c.FirstName,
                    c.LastName,
                    c.BirthDate,
                    c.IsActive,
                    c.CreatedAt,
                    p.Email AS ParentEmail,
                    p.FirstName AS ParentFirstName,
                    p.LastName AS ParentLastName
                FROM dbo.Children c
                LEFT JOIN dbo.Parents p ON p.Id = c.ParentId
                WHERE (@IncludeInactive = 1 OR c.IsActive = 1)
                ORDER BY c.Id DESC;";

            using SqlCommand cmd = new SqlCommand(sql, con);
            cmd.Parameters.AddWithValue("@IncludeInactive", includeInactive ? 1 : 0);

            List<ChildRecord> children = new List<ChildRecord>();
            using SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                children.Add(MapChild(reader));
            }

            return children;
        }

        public ChildRecord? GetChildById(int id)
        {
            using SqlConnection con = OpenConnection();

            const string sql = @"
                SELECT
                    c.Id,
                    c.ParentId,
                    c.FirstName,
                    c.LastName,
                    c.BirthDate,
                    c.IsActive,
                    c.CreatedAt,
                    p.Email AS ParentEmail,
                    p.FirstName AS ParentFirstName,
                    p.LastName AS ParentLastName
                FROM dbo.Children c
                LEFT JOIN dbo.Parents p ON p.Id = c.ParentId
                WHERE c.Id = @Id;";

            using SqlCommand cmd = new SqlCommand(sql, con);
            cmd.Parameters.AddWithValue("@Id", id);

            using SqlDataReader reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                return MapChild(reader);
            }

            return null;
        }

        public bool GetParentExists(int parentId)
        {
            using SqlConnection con = OpenConnection();

            const string sql = @"
                SELECT COUNT(1)
                FROM dbo.Parents
                WHERE Id = @ParentId AND IsActive = 1;";

            using SqlCommand cmd = new SqlCommand(sql, con);
            cmd.Parameters.AddWithValue("@ParentId", parentId);

            int count = Convert.ToInt32(cmd.ExecuteScalar());
            return count > 0;
        }

        public int PostCreateChild(int parentId, string firstName, string lastName, DateTime? birthDate)
        {
            using SqlConnection con = OpenConnection();

            const string sql = @"
                INSERT INTO dbo.Children (ParentId, FirstName, LastName, BirthDate, IsActive, CreatedAt)
                VALUES (@ParentId, @FirstName, @LastName, @BirthDate, 1, SYSUTCDATETIME());
                SELECT CAST(SCOPE_IDENTITY() AS int);";

            using SqlCommand cmd = new SqlCommand(sql, con);
            cmd.Parameters.AddWithValue("@ParentId", parentId);
            cmd.Parameters.AddWithValue("@FirstName", firstName);
            cmd.Parameters.AddWithValue("@LastName", lastName);
            cmd.Parameters.Add("@BirthDate", SqlDbType.Date).Value = birthDate.HasValue
                ? birthDate.Value.Date
                : DBNull.Value;

            return Convert.ToInt32(cmd.ExecuteScalar());
        }

        public bool PutUpdateChild(int id, int parentId, string firstName, string lastName, DateTime? birthDate, bool isActive)
        {
            using SqlConnection con = OpenConnection();

            const string sql = @"
                UPDATE dbo.Children
                SET
                    ParentId = @ParentId,
                    FirstName = @FirstName,
                    LastName = @LastName,
                    BirthDate = @BirthDate,
                    IsActive = @IsActive
                WHERE Id = @Id;";

            using SqlCommand cmd = new SqlCommand(sql, con);
            cmd.Parameters.AddWithValue("@Id", id);
            cmd.Parameters.AddWithValue("@ParentId", parentId);
            cmd.Parameters.AddWithValue("@FirstName", firstName);
            cmd.Parameters.AddWithValue("@LastName", lastName);
            cmd.Parameters.Add("@BirthDate", SqlDbType.Date).Value = birthDate.HasValue
                ? birthDate.Value.Date
                : DBNull.Value;
            cmd.Parameters.AddWithValue("@IsActive", isActive);

            return cmd.ExecuteNonQuery() > 0;
        }

        public bool DeleteDeactivateChild(int id)
        {
            using SqlConnection con = OpenConnection();

            const string sql = @"
                UPDATE dbo.Children
                SET IsActive = 0
                WHERE Id = @Id;";

            using SqlCommand cmd = new SqlCommand(sql, con);
            cmd.Parameters.AddWithValue("@Id", id);

            return cmd.ExecuteNonQuery() > 0;
        }

        private static ChildRecord MapChild(SqlDataReader reader)
        {
            string parentFirstName = reader.IsDBNull(8) ? string.Empty : reader.GetString(8);
            string parentLastName = reader.IsDBNull(9) ? string.Empty : reader.GetString(9);

            return new ChildRecord
            {
                Id = reader.GetInt32(0),
                ParentId = reader.GetInt32(1),
                FirstName = reader.GetString(2),
                LastName = reader.GetString(3),
                BirthDate = reader.IsDBNull(4) ? null : reader.GetDateTime(4),
                IsActive = reader.GetBoolean(5),
                CreatedAt = reader.GetDateTime(6),
                ParentEmail = reader.IsDBNull(7) ? string.Empty : reader.GetString(7),
                ParentFullName = $"{parentFirstName} {parentLastName}".Trim()
            };
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

    public class ChildRecord
    {
        public int Id { get; set; }
        public int ParentId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateTime? BirthDate { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public string ParentEmail { get; set; } = string.Empty;
        public string ParentFullName { get; set; } = string.Empty;
    }
}
