using AutoMapper;
using MediatR;
using Ordering.Application.Contracts.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ordering.Application.Features.Orders.Queries.GetOrdersList;

public class GetAllOrdersListQueryHandler : IRequestHandler<GetAllOrdersListQuery, List<AllOrderVm>>
{
    private readonly IOrderRepository _orderRepository;
    private readonly IMapper _mapper;

    public GetAllOrdersListQueryHandler(IOrderRepository orderRepository, IMapper mapper)
    {
        _orderRepository = orderRepository ?? throw new ArgumentNullException(nameof(orderRepository));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }
   

    public async Task<List<AllOrderVm>> Handle(GetAllOrdersListQuery request, CancellationToken cancellationToken)
    {
        var orderList = await _orderRepository.GetAllOrder();
        return _mapper.Map<List<AllOrderVm>>(orderList);
    }
}
