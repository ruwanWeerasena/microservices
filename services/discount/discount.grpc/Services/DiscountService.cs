using AutoMapper;
using discount.grpc.Protos;
using discount.grpc.Repositories;
using Grpc.Core;

namespace discount.grpc.services;

public class DiscountService : DiscountProtoService.DiscountProtoServiceBase
{
    private readonly IDiscountRepository _discountRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<DiscountService> _logger;

    public DiscountService(IDiscountRepository discountRepository, IMapper mapper, ILogger<DiscountService> logger)
    {
        _discountRepository = discountRepository ?? throw new ArgumentNullException(nameof(discountRepository));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }
    public override async Task<CouponModel> GetDiscount(GetDiscountRequest request, ServerCallContext context)
    {
        var productName = request.ProductName;
        var coupon = await _discountRepository.GetDiscount(productName);
        if (coupon == null) 
        {
            throw new RpcException(new Status(StatusCode.NotFound, $"Discount with ProductName={productName} is not found"));
        }
        _logger.LogInformation("Discount is retrieved for productName : {0} , Amount : {1}", coupon.ProductName, coupon.Amount);
        var couponModel = _mapper.Map<CouponModel>(coupon);
        return couponModel;
    }
}
