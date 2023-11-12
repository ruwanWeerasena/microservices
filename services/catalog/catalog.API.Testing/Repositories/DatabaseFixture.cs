using catalog.API.Data;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace catalog.API.Testing.Repositories;

public class DatabaseFixture : IDisposable
{
    private readonly IMongoClient _mongoClient;
    public ICatalogContext CatalogContext { get; private set; }

    public DatabaseFixture()
    {
        var testDatabaseName = "testmongo";

        _mongoClient = new MongoClient("mongodb://localhost:27017");

        var database = _mongoClient.GetDatabase(testDatabaseName);

        var configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json") 
            .Build();
        configuration["DatabaseSettings:ConnectionString"] = $"mongodb://localhost:27017";
        configuration["DatabaseSettings:DatabaseName"] = testDatabaseName;
        CatalogContext = new CatalogContext(configuration);

    }
    public void Dispose()
    {
        (_mongoClient as IClientSessionHandle)?.Dispose();
    }
}
