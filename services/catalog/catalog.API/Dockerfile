FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base

WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

COPY ["services/catalog/catalog.API/catalog.API.csproj","services/catalog/catalog.API/"]
RUN dotnet restore "services/catalog/catalog.API/catalog.API.csproj"

COPY . .
WORKDIR "/src/services/catalog/catalog.API"
RUN dotnet build "catalog.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "catalog.API.csproj" -c Release -o /app/publish

FROM base as final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet","catalog.API.dll"]
