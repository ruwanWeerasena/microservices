using Microsoft.AspNetCore.Mvc;
using catalog.API.Repositories;
using catalog.API.Data;
using System.Net;
using catalog.API.Entities;
namespace catalog.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class CatalogController : ControllerBase
{
    private readonly IProductRepository _productRepository;
    public CatalogController(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Product>), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<IEnumerable<Product>>> GetAll()
    {
        var products = await _productRepository.GetProducts();
        return Ok(products);
    }

    [HttpGet]
    [Route("{id}", Name="GetProduct")]
    [ProducesResponseType(typeof(IEnumerable<Product>), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<Product>> GetProductById(string id)
    {
        var product = await _productRepository.GetProduct(id);
        return Ok(product);
    }


    [Route("[action]/{category}" , Name="GetProductByCategory")]
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Product>), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<IEnumerable<Product>>> GetProductByCategory(string category)
    {
        var products = await _productRepository.GetProductByCategory(category);
        return Ok(products);
    }

    [HttpPost]
    [ProducesResponseType(typeof(Product),(int)HttpStatusCode.OK)]
    public async Task<ActionResult<Product>> createProduct([FromBody] Product product)
    {
        Console.WriteLine(product.Name);
        await _productRepository.createProduct(product);
        return CreatedAtRoute("GetProduct",new {id= product.Id},product);
    }

    [HttpPut]
    [ProducesResponseType(typeof(Product), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> UpdateProduct([FromBody] Product product)
    {
        return Ok(await  _productRepository.updateProduct(product));
    }

    [HttpDelete("{id:length(24)}" , Name = "DeleteProduct")]
    [ProducesResponseType(typeof (Product), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> DeleteProductById (string id)
    {
        return Ok(await _productRepository.deleteProduct(id));
    }
}