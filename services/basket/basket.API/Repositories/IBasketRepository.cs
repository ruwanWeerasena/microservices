using basket.API.Entities;
namespace basket.API.Repositories;

public interface IBasketRepository
{
    Task<ShoppingCart> GetBasket(string username);
    Task DeleteBasket(string username);
    Task<ShoppingCart> UpdateBasket(ShoppingCart basket);
}
