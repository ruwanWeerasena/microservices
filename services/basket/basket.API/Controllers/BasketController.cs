using Microsoft.AspNetCore.Mvc;
using basket.API.Repositories;
using basket.API.Entities;
using System.Net;
using basket.API.GrpcService;
using EventBus.Messages.Events;
using AutoMapper;
using MassTransit;

namespace basket.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class BasketController : ControllerBase
{
   
    private readonly IBasketRepository _basketRepository;
    private readonly DiscountGrpcService _discountGrpcService;
    private readonly IMapper _mapper;
    private readonly IPublishEndpoint _publishEndpoint;
    public BasketController(IBasketRepository basketRepository, DiscountGrpcService discountGrpcService, IMapper mapper, IPublishEndpoint publishEndpoint)
    {
        _basketRepository = basketRepository;
        _discountGrpcService = discountGrpcService;
        _mapper = mapper;
        _publishEndpoint = publishEndpoint;
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

            item.DiscountedPrice = item.Price - coupon.Amount;
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

    [HttpPost("[action]")]
    [ProducesResponseType((int)HttpStatusCode.Accepted)]
    [ProducesResponseType((int)HttpStatusCode.BadRequest)]
    public async Task<IActionResult> Checkout([FromBody] BasketCheckout basketCheckout)
    {
        //get existing basket with total price
        var basket = await _basketRepository.GetBasket(basketCheckout.UserName);
        if(basket is null)
        {
            return BadRequest();
        }

        //create basketChekoutEvent --set TotalPrice on basketCheckout eventmessage
        //send checkout event to rabbitmq
        var eventMessage = _mapper.Map<BasketCheckoutEvent>(basketCheckout);
        eventMessage.TotalPrice= basket.TotalPrice; 
        await _publishEndpoint.Publish(eventMessage);
        //remove the basket
        await _basketRepository.DeleteBasket(basket.Username);

        return Accepted();
    }
}
