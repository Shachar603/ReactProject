using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/health")]
public class HealthController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public HealthController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("db")]
    public async Task<IActionResult> CheckDatabase(CancellationToken cancellationToken)
    {
        try
        {
            // Opens a real SQL connection and confirms the server is reachable.
            var canConnect = await _dbContext.Database.CanConnectAsync(cancellationToken);
            if (!canConnect)
            {
                return StatusCode(503, new
                {
                    ok = false,
                    message = "Database is configured but not reachable."
                });
            }

            await using var connection = _dbContext.Database.GetDbConnection();
            await connection.OpenAsync(cancellationToken);

            return Ok(new
            {
                ok = true,
                database = connection.Database,
                dataSource = connection.DataSource,
                serverVersion = connection.ServerVersion
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                ok = false,
                message = "Database connection failed.",
                error = ex.Message
            });
        }
    }
}
