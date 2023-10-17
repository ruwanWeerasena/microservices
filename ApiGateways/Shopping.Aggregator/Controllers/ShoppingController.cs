using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shopping.Aggregator.Models;
using Shopping.Aggregator.Services;
using System.Net;

namespace Shopping.Aggregator.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public class ShoppingController : ControllerBase
{
    private readonly ICatalogService _catalogService;
    private readonly IBasketService _basketService;
    private readonly IOrderService _orderService;

    public ShoppingController(IOrderService orderService, IBasketService basketService, ICatalogService catalogService)
    {
        _orderService = orderService;
        _basketService = basketService;
        _catalogService = catalogService;
    }

    [HttpGet("{userName}",Name = "GetShopping")]
    [ProducesResponseType(typeof(ShoppingModel),(int)HttpStatusCode.OK)]
    public async Task<ActionResult<ShoppingModel>> GetShopping(string userName)
    {
        //getbasket with username
        var basket = await _basketService.GetBasket(userName);
        //iterate items and populate other fields using item productId
        foreach (var basketItem in basket.Items)
        {
            var product = await _catalogService.GetCatalog(basketItem.ProductId);
            //set additional fields
            basketItem.Category =product.Category;
            basketItem.Summery= product.Summery;
            basketItem.Description= product.Description;
            basketItem.ImageFile= product.ImageFile;
        }
        //consume ordering ms and get orders list
        var orders = await _orderService.GetOrdersByUserName(userName);
        //return root shoppingmodel dto class which including all responses
        var shoppingModel = new ShoppingModel
        {
            UserName = userName,
            BasketWithProducts = basket,
            Orders = orders
        };

        return Ok(shoppingModel);
        
    }

}
