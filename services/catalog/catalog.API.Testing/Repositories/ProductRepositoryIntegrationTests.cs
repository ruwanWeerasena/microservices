using catalog.API.Entities;
using catalog.API.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace catalog.API.Testing.Repositories;

[Collection("DatabaseCollection")]
public class ProductRepositoryIntegrationTests
{
    private  ProductRepository _productRepository;
    private readonly DatabaseFixture _databaseFixture;
    public ProductRepositoryIntegrationTests(DatabaseFixture databaseFixture)
    {
        _databaseFixture = databaseFixture;
        
    }
    [Fact]
    public async Task GetProducts_ShouldReturnAllProducts()
    {
        // Arrange 

        // Act
        _productRepository = new ProductRepository(_databaseFixture.CatalogContext);
        var result = await _productRepository.GetProducts();

        // Assert
        Assert.NotNull(result);
    }
    [Fact]
    public async Task GetProduct_ShouldReturnOneProduct()
    {
        // Arrange

        // Act
        _productRepository = new ProductRepository(_databaseFixture.CatalogContext);
        var result = await _productRepository.GetProduct("602d2149e773f2a3990b47f6");

        // Assert
        Assert.NotNull(result);
        Assert.Equal("602d2149e773f2a3990b47f6",result.Id);
        Assert.IsType<Product>(result);
    }
}
