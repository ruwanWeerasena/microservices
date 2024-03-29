﻿using Microsoft.Extensions.Logging;
using Ordering.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ordering.Infrastructure.Persistence;

public class OrderContextSeed
{
    public static async Task SeedAsync (OrderContext context,ILogger<OrderContextSeed> logger)
    {
        if(!context.Orders.Any())
        {
            context.Orders.AddRange(GetPreConfiguredOrders());
            await context.SaveChangesAsync();
        }
    }

    private static IEnumerable<Order> GetPreConfiguredOrders()
    {
        return new List<Order>
        {
            new Order { UserName="rw", FirstName="ruwan",LastName="Weerasena", EmailAddress="ruwan@email.com", AddressLine="Colombo",Country="SriLanka", TotalPrice=350 }
        };
    }
}
