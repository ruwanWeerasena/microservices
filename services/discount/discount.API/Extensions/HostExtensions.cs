﻿using discount.API.Entities;
using Microsoft.AspNetCore;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace discount.API.Extensions
{
    public static class HostExtensions
    {
        public static IApplicationBuilder MigrateDatabase<TContext> (this IApplicationBuilder app, int? retry =0)
        {
            int retryForAvailability = retry.Value;

            using(var scope = app.ApplicationServices.CreateScope()) 
            {
                var services = scope.ServiceProvider;
                var configuration = services.GetRequiredService<IConfiguration>();
                var logger = services.GetRequiredService<ILogger<TContext>>();

                try
                {
                    logger.LogInformation("migrating postgres database");
                    using (var connection = new NpgsqlConnection(configuration.GetValue<string>("DatabaseSettings:ConnectionString")))
                    {
                        connection.Open();
                        using var command = new NpgsqlCommand
                        {
                            Connection = connection,
                        };
                        command.CommandText = "DROP TABLE IF EXISTS Coupon";
                        command.ExecuteNonQuery();

                        command.CommandText = @"CREATE TABLE Coupon(
                                        Id SERIAL PRIMARY KEY,
                                        ProductName VARCHAR(24) NOT NULL,
                                        Description TEXT,
                                        Amount INT)";
                        command.ExecuteNonQuery();

                        command.CommandText = @"Insert into Coupon (ProductName,Description,Amount) values ('IPhone X','IPhone Discount',5000)";
                        command.ExecuteNonQuery();

                        command.CommandText = @"Insert into Coupon (ProductName,Description,Amount) values ('Samsung A32','Samsung Discount',8000)";
                        command.ExecuteNonQuery();

                        logger.LogInformation("Migrated Postgres database");

                    }
                    
                }
                catch (NpgsqlException ex) 
                {
                    logger.LogError(ex, "An error occured while migrating the postgresql database");
                    if(retryForAvailability < 50) 
                    {
                        retryForAvailability++;
                        Thread.Sleep(2000);
                        MigrateDatabase<TContext>(app, retryForAvailability);
                    }
                }

                return app;
            }
        }
    }
}
