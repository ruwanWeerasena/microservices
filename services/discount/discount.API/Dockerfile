From mcr.microsoft.com/dotnet/aspnet:7.0 AS base

WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

COPY ["services/discount/discount.API/discount.API.csproj","services/discount/discount.API/"]
RUN dotnet restore "services/discount/discount.API/discount.API.csproj"

COPY . .
WORKDIR "/src/services/discount/discount.API"
RUN dotnet build "discount.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "discount.API.csproj" -c Release -o /app/publish

FROM base as final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet","discount.API.dll"]
