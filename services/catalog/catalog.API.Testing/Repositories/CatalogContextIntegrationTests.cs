using catalog.API.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace catalog.API.Testing.Repositories;

[Collection("DatabaseCollection")]
public class CatalogContextIntegrationTests
{
    private readonly ICatalogContext _catalogContext;
    public CatalogContextIntegrationTests(DatabaseFixture databaseFixture)
    {
        _catalogContext = databaseFixture.CatalogContext;
    }

    [Fact]
    public void CatalogContext_ShouldConnectToDatabase()
    {
        var products =  _catalogContext.Products;

        // Assert
        Assert.NotNull(products);
    }

}
