using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace NkomCase;

public class Function1
{
    private readonly ILogger<Function1> _logger;
    private static List<Application> _applications = new List<Application>(); // Lagrer søknader i minnet

    public Function1(ILogger<Function1> logger)
    {
        _logger = logger;
    }


    [Function("ApplicationsApi")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = "applications")] HttpRequest req) // Både get og post -> Endepunkt: /api/applications
    {
        if (req.Method == HttpMethods.Get)
        {
            return new OkObjectResult(_applications); // Get request returnerer alle søknader som JSON
        }
        else if (req.Method == HttpMethods.Post)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var data = JsonSerializer.Deserialize<Application>(requestBody);

            var newApp = new Application
            {
                Id = Guid.NewGuid(),
                Title = data.Title,
                Status = "Ny", // Alle nye søknader får status "Ny" 
                CreatedAt = DateTime.UtcNow
            };
            _applications.Add(newApp); // Legger til den nye søknaden i listen
            return new OkObjectResult(newApp);
        }
        return new BadRequestResult();
    }

    public class Application // Modell for en søknad
    {
        public Guid Id { get; set; } // Unik ID for hver søknad
        public string Title { get; set; } // Valgfri tittel
        public string Status { get; set; } // Ny eller ferdig
        public DateTime CreatedAt { get; set; } // Når søknaden ble opprettet

    }
}