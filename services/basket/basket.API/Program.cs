using basket.API.GrpcService;
using basket.API.Repositories;
using discount.grpc.Protos;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<IBasketRepository , BasketRepository>();
builder.Services.AddScoped<DiscountGrpcService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddStackExchangeRedisCache(o=>
{
    o.Configuration = builder.Configuration.GetValue<string>("CacheSettings:ConnectionString");
});

builder.Services.AddGrpcClient<DiscountProtoService.DiscountProtoServiceClient>
    (o => o.Address = new Uri(builder.Configuration["GrpcSettings:DiscountUrl"]));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
