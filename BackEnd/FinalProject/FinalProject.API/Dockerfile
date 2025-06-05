# Base image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080

# Build image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

COPY ["FinalProject.API/FinalProject.API.csproj", "FinalProject.API/"]
COPY ["FinalProject.Data/FinalProject.Data.csproj", "FinalProject.Data/"]
COPY ["FinalProject.Clean/FinalProject.Core.csproj", "FinalProject.Clean/"]
COPY ["FinalProject.Service/FinalProject.Service.csproj", "FinalProject.Service/"]

RUN dotnet restore "./FinalProject.API/FinalProject.API.csproj"
COPY . .
WORKDIR "/src/FinalProject.API"
RUN dotnet build "./FinalProject.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish image
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./FinalProject.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Final image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "FinalProject.API.dll"]
