using Dapper;
using discount.API.Entities;
using Npgsql;

namespace discount.API.Repositories;

public class DiscountRepository : IDiscountRepository
{
    private readonly IConfiguration _configuration;

    public DiscountRepository(IConfiguration configuration)
    {
        _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
    }


    public async Task<Coupon> GetDiscount(string productName)
    {
        using (var connection = new NpgsqlConnection(_configuration.GetValue<string>("DatabaseSettings:ConnectionString")))
        {
            var coupon = await connection.QueryFirstOrDefaultAsync<Coupon>(
                "Select * from Coupon where ProductName=@ProductName",
                new Coupon{ ProductName = productName }
                );
            if(coupon == null) 
            {
                return new Coupon { ProductName="No Discount",Amount=0,Description="No Discount Desc"};
            }
            return coupon;
        }
    }

    public async Task<bool> DeleteDiscount(string productName)
    {
        using (var connection = new NpgsqlConnection(_configuration.GetValue<string>("DatabaseSettings:ConnectionString")))
        {
            var affected = await connection.ExecuteAsync(
                "Delete From Coupon Where ProductName=@ProductName",
                new Coupon
                {
                    ProductName = productName,
                    
                });
            if (affected == 0)
            {
                return false;
            }
            return true;
        }
    }


    public async Task<bool> UpdateDiscount(Coupon coupon)
    {
        using (var connection = new NpgsqlConnection(_configuration.GetValue<string>("DatabaseSettings:ConnectionString")))
        {
            var affected = await connection.ExecuteAsync(
                "Update Coupon SET  ProductName=@ProductName,Description=@Description,Amount=@Amount where Id=@Id",
                new Coupon
                {
                    ProductName = coupon.ProductName,
                    Description = coupon.Description,
                    Amount = coupon.Amount,
                    Id = coupon.Id
                });
            if (affected == 0)
            {
                return false;
            }
            return true;
        }
    }

    public async Task<bool> CreateDiscount(Coupon coupon)
    {
        using (var connection = new NpgsqlConnection(_configuration.GetValue<string>("DatabaseSettings:ConnectionString")))
        {
            var affected = await connection.ExecuteAsync(
                "Insert into Coupon (ProductName,Description,Amount) values (@ProductName,@Description,@Amount)", 
                new Coupon { 
                    ProductName = coupon.ProductName,
                    Description = coupon.Description,
                    Amount = coupon.Amount,
                });
            if (affected == 0)
            {
                return false;
            }
            return true;
        }
    }

    public async Task<List<Coupon>> GetAllDiscounts()
    {
        using (var connection = new NpgsqlConnection(_configuration.GetValue<string>("DatabaseSettings:ConnectionString")))
        {
            
            var coupon = await connection.QueryAsync<Coupon>("Select * from Coupon");
            if (coupon == null)
            {
                return new List<Coupon>();
            }
            return coupon.ToList();
        }
    }
}
