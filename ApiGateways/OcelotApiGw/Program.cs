using Ocelot.Cache.CacheManager;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();

builder.Configuration.AddJsonFile($"ocelot.{builder.Environment.EnvironmentName}.json",true,true);
builder.Logging.AddConfiguration(builder.Configuration.GetSection("Logging")).AddConsole().AddDebug();


builder.Services.AddOcelot().AddCacheManager(settings =>
{
    settings.WithDictionaryHandle();
});


var app = builder.Build();
app.UseCors(c=>c.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

await app.UseOcelot();

app.MapGet("/", () => "Hello World!");


app.Run();
