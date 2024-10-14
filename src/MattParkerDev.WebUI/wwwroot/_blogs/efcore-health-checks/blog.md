ASP.NET Core allows us to use health checks to monitor the health of our application. This is useful for monitoring the health of our database, cache, and other services. 

Adding a health check for an Entity Framework Core database is not immediately apparent, but is quite simple.

Lets first add the `Microsoft.Extensions.Diagnostics.HealthChecks.EntityFrameworkCore` package to our project.

I discovered this package by reading the [ASP.NET Core source code on GitHub.](https://github.com/dotnet/aspnetcore/blob/main/src/Middleware/HealthChecks.EntityFrameworkCore/src/DependencyInjection/EntityFrameworkCoreHealthChecksBuilderExtensions.cs)




Now, where we configure our services, we can add a health check for our database:

**e.g. Program.cs**
```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHealthChecks().AddDbContextCheck<ApplicationDbContext>();

...
```

Easy as that! The health check will call `DatabaseFacade.CanConnectAsync()` to check the health of the database.