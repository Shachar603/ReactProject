using Microsoft.AspNetCore.Mvc;
using ReactServerSide.DAL;

namespace ReactServerSide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InstructorController : ControllerBase
    {
        private readonly DBServices _db;

        public InstructorController(DBServices db)
        {
            _db = db;
        }

        [HttpPost("manager-create")]
        public IActionResult CreateInstructor([FromBody] CreateInstructorRequest request)
        {
            if (request == null)
            {
                return BadRequest(new { message = "Request body is required." });
            }

            if (string.IsNullOrWhiteSpace(request.ManagerEmail) || string.IsNullOrWhiteSpace(request.ManagerPassword))
            {
                return Unauthorized(new { message = "Manager credentials are required." });
            }

            if (string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Password) ||
                string.IsNullOrWhiteSpace(request.FirstName) ||
                string.IsNullOrWhiteSpace(request.LastName))
            {
                return BadRequest(new { message = "Email, password, first name and last name are required." });
            }

            string managerEmail = request.ManagerEmail.Trim().ToLowerInvariant();
            string targetEmail = request.Email.Trim().ToLowerInvariant();
            string firstName = request.FirstName.Trim();
            string lastName = request.LastName.Trim();

            if (!_db.PostIsManagerCredentialsValid(managerEmail, request.ManagerPassword))
            {
                return Unauthorized(new { message = "Only manager can create users." });
            }

            if (_db.PostEmailExists(targetEmail))
            {
                return Conflict(new { message = "Email already exists." });
            }

            int newId = _db.PostCreateInstructor(targetEmail, request.Password, firstName, lastName);

            return Created(string.Empty, new
            {
                id = newId,
                email = targetEmail,
                role = "Instructor"
            });
        }

        public class CreateInstructorRequest
        {
            public string ManagerEmail { get; set; } = string.Empty;
            public string ManagerPassword { get; set; } = string.Empty;
            public string Email { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
            public string FirstName { get; set; } = string.Empty;
            public string LastName { get; set; } = string.Empty;
        }
    }
}
