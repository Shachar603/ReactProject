using Microsoft.AspNetCore.Mvc;
using System;
using Microsoft.Data.SqlClient;
using ReactServerSide.DAL; // Make sure this matches your DBservices namespace

namespace ServerLogic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestDbController : ControllerBase
    {
        [HttpGet("check-connection")]
        public IActionResult CheckConnection()
        {
            DBGet db = new DBGet();

            try
            {
                // This will jump to your DBservices class and try to open the connection
                using (SqlConnection con = db.connect("myProjDB"))
                {
                    // If it gets to this line without crashing, it works!
                    return Ok("🎉 Success! Connected to the Ruppin database perfectly.");
                }
            }
            catch (Exception ex)
            {
                // If it fails, it will spit out the exact reason why
                return StatusCode(500, $"Connection failed: {ex.Message}");
            }
        }
    }
}