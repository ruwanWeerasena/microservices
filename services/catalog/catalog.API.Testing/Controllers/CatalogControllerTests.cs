using catalog.API.Controllers;
using catalog.API.Entities;
using catalog.API.Repositories;

using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace catalog.API.Testing.Controllers;

public class CatalogControllerTests
{
    private readonly CatalogController _sut;
    private readonly Mock<IProductRepository> _productRepository;
    public CatalogControllerTests()
    {
        _productRepository = new Mock<IProductRepository>();
        _sut = new CatalogController(_productRepository.Object);
    }

    [Fact]
    public async Task GetAll_ShouldReturnActionResult()
    {
        _productRepository.Setup(x=>x.GetProducts()).ReturnsAsync(new List<Product>());


        var response = await _sut.GetAll();

        //Assert
  
        Assert.NotNull(response);
        Assert.IsType <ActionResult<IEnumerable<Product>>> (response);
        
    }

    [Fact]
    public async Task GetProductById_ShouldReturnActionResult()
    {
        var product = new Product();
        
        _productRepository.Setup(y => y.GetProduct(It.IsAny<string>())).ReturnsAsync(product);
        var response = await _sut.GetProductById("id");

        Assert.NotNull(response);
        Assert.IsType<ActionResult<Product>>(response);
    }

    [Fact]
    public async Task GetProductByCategory_ShouldReturnActionResult()
    {
        _productRepository.Setup(x => x.GetProductByCategory(It.IsAny<string>())).ReturnsAsync(new List<Product>());
        var response = await _sut.GetProductById("categoryName");

        Assert.NotNull(response);
        Assert.IsType<ActionResult<Product>>(response);
    }

    [Fact]
    public async Task createProduct_ShouldReturnActionResult()
    {
        var product = new Product { Id = "1", Name = "TestProduct" };
        _productRepository.Setup(x => x.createProduct(It.IsAny<Product>()));
        var result = await _sut.createProduct(new Product());

        Assert.NotNull(result);
        Assert.IsType<ActionResult<Product>>(result);

       
    }


    [Theory]
    [InlineData(null, typeof(BadRequestResult))]
    [InlineData("123", typeof(OkObjectResult))]

    public async Task UpdateProduct_ShouldReturnActionResult(object productId, Type expectedResultType)
    {
       
        _productRepository.Setup(x => x.updateProduct(It.IsAny<Product>())).ReturnsAsync(true);
        var product = new Product { Id = productId?.ToString(), Name = "UpdatedProduct" };

        var result = await _sut.UpdateProduct(product);


        Assert.IsType(expectedResultType, result);

    }

    [Fact]
    public async Task DeleteProductById_ShouldReturnOkActionResult()
    {
        _productRepository.Setup(x => x.deleteProduct(It.IsAny<string>())).ReturnsAsync(true);
        var id = "123";
        var result = await _sut.DeleteProductById(id);

        Assert.IsType<OkObjectResult>(result);
    }

}
