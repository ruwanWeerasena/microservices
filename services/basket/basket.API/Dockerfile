#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["services/basket/basket.API/basket.API.csproj", "services/basket/basket.API/"]
COPY ["BuildingBlocks/EventBus.Messages/EventBus.Messages.csproj", "BuildingBlocks/EventBus.Messages/"]
RUN dotnet restore "services/basket/basket.API/basket.API.csproj"
COPY . .
WORKDIR "/src/services/basket/basket.API"
RUN dotnet build "basket.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "basket.API.csproj" -c Release -o /app/publish 

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "basket.API.dll"]