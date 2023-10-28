﻿namespace basket.API.Entities;

public class ShoppingCart
{
    public ShoppingCart(string username)
    {
        Username = username;
    }

    public string Username { get; set; }
	public List<ShoppingCartItem> Items { get; set; } = new List<ShoppingCartItem>();

	public decimal TotalPrice
	{
		get
		{
			decimal totalPrice = 0;
			foreach (var item in Items)
			{
				totalPrice += item.DiscountedPrice * item.Quantity;
			}
			return totalPrice;
		}
	}
}
