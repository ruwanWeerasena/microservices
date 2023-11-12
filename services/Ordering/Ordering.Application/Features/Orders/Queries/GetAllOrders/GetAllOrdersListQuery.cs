using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ordering.Application.Features.Orders.Queries.GetOrdersList;

public class GetAllOrdersListQuery : IRequest<List<AllOrderVm>>
{

    public GetAllOrdersListQuery()
    {
    }
}
