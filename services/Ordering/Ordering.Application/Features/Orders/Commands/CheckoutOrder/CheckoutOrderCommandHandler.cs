using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using Ordering.Application.Contracts.Infrastructure;
using Ordering.Application.Contracts.Persistence;
using Ordering.Application.Models;
using Ordering.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ordering.Application.Features.Orders.Commands.CheckoutOrder;

public class CheckoutOrderCommandHandler : IRequestHandler<CheckoutOrderCommand, int>
{
    private readonly IOrderRepository _orderRepository;
    private readonly IMapper _mapper;
    private readonly IEmailSevice _emailSevice;
    private readonly ILogger<CheckoutOrderCommandHandler> _logger;

    public CheckoutOrderCommandHandler(IOrderRepository orderRepository, IMapper mapper, IEmailSevice emailSevice, ILogger<CheckoutOrderCommandHandler> logger)
    {
        _orderRepository = orderRepository;
        _mapper = mapper;
        _emailSevice = emailSevice;
        _logger = logger;
    }
    public async Task<int> Handle(CheckoutOrderCommand request, CancellationToken cancellationToken)
    {
        var order = _mapper.Map<Order>(request);
        var neworder = await _orderRepository.AddAsync(order);
        _logger.LogInformation($"Order {neworder.Id} is Successfully Created");
        await SendEmail(neworder);
        return neworder.Id;
    }

    public async Task SendEmail(Order order)
    {
        var email = new Email { To = "user@gmail.com", Body = $"Your Order Created which ID={order.Id}", Subject = $"Order #{order.Id} Created" };
        try
        {
            await _emailSevice.SendEmail(email);
        }catch (Exception ex)
        {
            _logger.LogError($"Order {order.Id} failed due to error with email service :{ex.Message}");
        }
    }
}
