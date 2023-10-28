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
                Description = "This is Company's Biggest change to its flagships",
                ImageFile = "IPhone-X.jpg",
                Price = 95000.00M,
                Category = "smart phone"
            },
            new Product()
            {
                Id="602d2149e773f2a3990b47f6",
                Name = "Samsung Galaxy Note 10",
                Summery = "This is Company's Biggest change to its flagships",
                Description = "Lorem ipsum",
                ImageFile = "Samsung-Galaxy-Note-10.jpg",
                Price = 120000.00M,
                Category = "smart phone"
            },
            new Product()
            {
                Id="602d2149e773f2a3990b47f7",
                Name = "Samsung A32",
                Summery = "This is Company's Biggest change to its flagships",
                Description = "Lorem ipsum",
                ImageFile = "Samsung-A32.jpg",
                Price = 100000.00M,
                Category = "smart phone"
            },
            new Product()
            {
                Id="602d2149e773f2a3990b47f8",
                Name = "Oppo A17k",
                Summery = "This is Company's Biggest change to its flagships",
                Description = "This is Company's Biggest change to its flagships",
                ImageFile = "Oppo-A17k.jpg",
                Price = 40000.00M,
                Category = "smart phone"
            },new Product()
            {
                Id="602d2149e773f2a3990b47f9",
                Name = "Realme C55",
                Summery = "This is Company's Biggest change to its flagships",
                Description = "This is Company's Biggest change to its flagships",
                ImageFile = "Realme-C55.jpg",
                Price = 65000.00M,
                Category = "smart phone"
            },
        };
    }
}