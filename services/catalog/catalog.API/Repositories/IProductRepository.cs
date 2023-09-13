using catalog.API.Entities;

namespace catalog.API.Repositories;

public interface IProductRepository
{
    Task<IEnumerable<Product>> GetProducts();
    Task<Product> GetProduct (string id);
    Task<IEnumerable<Product>> GetProductByName (string name);
    Task<IEnumerable<Product>> GetProductByCategory (string categoryName);
    Task createProduct (Product product);
    Task<bool> updateProduct (Product product);
    Task<bool> deleteProduct (string id);
}