using basket.API.GrpcService;
using basket.API.Repositories;
using discount.grpc.Protos;
using MassTransit;


var builder = WebApplication.CreateBuilder(args);

//General configurations
builder.Services.AddScoped<IBasketRepository , BasketRepository>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(Program));

//RabitMq-MassTransit Configuration
builder.Services.AddMassTransit(config =>
{
    config.UsingRabbitMq((ctx, cfg) => {
        //       protocol://username:password@sever:port
        cfg.Host(builder.Configuration["EventBusSettings:HostAddress"]);
    });
});

//Redis Configuration
builder.Services.AddStackExchangeRedisCache(o=>
{
    o.Configuration = builder.Configuration.GetValue<string>("CacheSettings:ConnectionString");
});

//Grpc Configuration

builder.Services.AddGrpcClient<DiscountProtoService.DiscountProtoServiceClient>
    (o => o.Address = new Uri(builder.Configuration["GrpcSettings:DiscountUrl"]));
builder.Services.AddScoped<DiscountGrpcService>();
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
