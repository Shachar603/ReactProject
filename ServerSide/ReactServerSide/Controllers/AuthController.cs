using Microsoft.AspNetCore.Mvc;
using ReactServerSide.DAL;

namespace ReactServerSide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DBServices _db;

        public AuthController(DBServices db)
        {
            _db = db;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new { message = "Email and password are required." });
            }

            string normalizedEmail = request.Email.Trim().ToLowerInvariant();

            AuthenticatedUser? user = _db.PostAuthenticateUser(normalizedEmail, request.Password);
            if (user != null)
            {
                return Ok(new
                {
                    id = user.Id,
                    email = user.Email,
                    role = user.Role,
                    userType = user.UserType,
                    fullName = user.FullName
                });
            }

            return Unauthorized(new { message = "Invalid email or password." });
        }

        public class LoginRequest
        {
            public string Email { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }
    }
}