using Microsoft.AspNetCore.Mvc;
using basket.API.Repositories;
using basket.API.Entities;
using System.Net;
using basket.API.GrpcService;

namespace basket.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class BasketController : ControllerBase
{
   
    private readonly IBasketRepository _basketRepository;
    private readonly DiscountGrpcService _discountGrpcService;

    public BasketController(IBasketRepository basketRepository, DiscountGrpcService discountGrpcService)
    {
        _basketRepository = basketRepository;
        _discountGrpcService = discountGrpcService;
    }


    [HttpGet("{username}", Name="GetBasket")]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    public async Task<ActionResult<ShoppingCart>> GetBasket(string username)
    {
        var basket = await _basketRepository.GetBasket(username);
        return Ok(basket?? new ShoppingCart(username));
    }

    [HttpPost]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    public async Task<ActionResult<ShoppingCart>> UpdateBasket([FromBody]ShoppingCart basket)
    {
        foreach (var item in basket.Items)
        {
            var coupon = await _discountGrpcService.GetDiscount(item.ProductName);

            item.Price -= coupon.Amount;
        }

        return Ok( await _basketRepository.UpdateBasket(basket));
    }

    [HttpDelete("{username}", Name="DeleteBasket")]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    public async Task<ActionResult<ShoppingCart>> DeleteBasket(string username)
    {
        await _basketRepository.DeleteBasket(username);
        return Ok();
    }
}
