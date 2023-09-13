using MongoDB.Driver;
using catalog.API.Entities;
namespace catalog.API.Data;

public class CatalogContextSeed
{
    public static void SeedData(IMongoCollection<Product> productCollection )
    {
        bool existing = productCollection.Find(p=>true).Any();
        if(!existing)
        {
            productCollection.InsertManyAsync(GetPreconfiguredProducts());
        }
    }
    
    private static IEnumerable<Product> GetPreconfiguredProducts()
    {
        return new List<Product>()
        {
            new Product()
            {
                Id="602d2149e773f2a3990b47f5",
                Name = "IPhone X",
                Summery = "This is Company's Biggest change to its flagships",
                Description = "Lorem ipsum",
                ImageFile = "product-1.jpg",
                Price = 950.00M,
                Category = "smart phone"
            },
            new Product()
            {
                Id="602d2149e773f2a3990b47f6",
                Name = "Samsung 10",
                Summery = "This is Company's Biggest change to its flagships",
                Description = "Lorem ipsum",
                ImageFile = "product-1.jpg",
                Price = 1000.00M,
                Category = "smart phone"
            },
            new Product()
            {
                Id="602d2149e773f2a3990b47f7",
                Name = "Samsung 20",
                Summery = "This is Company's Biggest change to its flagships",
                Description = "Lorem ipsum",
                ImageFile = "product-1.jpg",
                Price = 1500.00M,
                Category = "smart phone"
            }
        };
    }
}