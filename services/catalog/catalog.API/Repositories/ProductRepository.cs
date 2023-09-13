using catalog.API.Entities;
using catalog.API.Data;
using MongoDB.Driver;
namespace catalog.API.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly ICatalogContext _catelogContext;

    public ProductRepository(ICatalogContext catelogContext)
    {
        _catelogContext = catelogContext ?? throw new ArgumentNullException(nameof(catelogContext));
    }

    public async Task<IEnumerable<Product>> GetProducts()
    {
        return await _catelogContext.Products.Find(p=>true).ToListAsync();
    }
    public async Task<Product> GetProduct(string id)
    {
        return await _catelogContext.Products.Find(p=>p.Id == id).FirstOrDefaultAsync();
    }
    public async Task<IEnumerable<Product>> GetProductByName(string name)
    {
        FilterDefinition<Product> filter = Builders<Product>.Filter.ElemMatch(p => p.Name, name);
        return await _catelogContext.Products.Find(filter).ToListAsync();
    }
    public async Task<IEnumerable<Product>> GetProductByCategory(string categoryName)
    {
        FilterDefinition<Product> filter = Builders<Product>.Filter.Eq(p => p.Category, categoryName);
        return await _catelogContext.Products.Find(filter).ToListAsync();
    }
    public async Task createProduct(Product product)
    {
        await _catelogContext.Products.InsertOneAsync(product);
    }
    public async Task<bool> updateProduct(Product product)
    {
        var updateResult = await _catelogContext.Products.ReplaceOneAsync(filter:g=>g.Id==product.Id, replacement:product);
        return updateResult.IsAcknowledged && updateResult.ModifiedCount > 0;
    }
    public async Task<bool> deleteProduct(string id)
    {
        FilterDefinition<Product> filter = Builders<Product>.Filter.Eq(p => p.Id, id);
        DeleteResult deleteResult = await _catelogContext.Products.DeleteOneAsync(filter);
        return deleteResult.IsAcknowledged && deleteResult.DeletedCount > 0;
    }
}