using AutoMapper;
using basket.API.Entities;
using EventBus.Messages.Events;

namespace basket.API.Mapper;

public class BasketProfile : Profile
{
    public BasketProfile()
    {
        CreateMap<BasketCheckout , BasketCheckoutEvent>().ReverseMap();
    }
}
