﻿namespace Shopping.Aggregator.Models;

public class BasketItemExtendedModel
{
    public int Quantity { get; set; }
    public string Color { get; set; }
    public decimal Price { get; set; }
    public string ProductId { get; set; }
    public string ProductName { get; set; }

    //extended ones
    public string Category { get; set; }
    public string Summery { get; set; }
    public string Description { get; set; }
    public string ImageFile { get; set; }
}