//using FinalProject.Core;
//using FinalProject.Core.IRepositories;
//using FinalProject.Core.IServices;
//using FinalProject.Data;
//using FinalProject.Data.Repositories;
//using FinalProject.Service.Services;
//using Microsoft.OpenApi.Models;
//using System.Text.Json.Serialization;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.IdentityModel.Tokens;
//using System.Text;
//using DotNetEnv; // Add this
//Env.Load();


//var builder = WebApplication.CreateBuilder(args);

//// Load environment variables from .env file


//// Add environment variables to configuration
//foreach (System.Collections.DictionaryEntry envVar in Environment.GetEnvironmentVariables())
//{
//    builder.Configuration[envVar.Key.ToString()] = envVar.Value?.ToString();
//}

//// Add services to the container
//builder.Services.AddControllers().AddJsonOptions(options =>
//{
//    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
//    options.JsonSerializerOptions.WriteIndented = true;
//});

//builder.Services.AddHttpClient();
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//// Register Services & Repositories
//builder.Services.AddScoped<IDoctorService, DoctorService>();
//builder.Services.AddScoped<IDoctorRepository, DoctorRepository>();
//builder.Services.AddScoped<IMessageService, MessageService>();
//builder.Services.AddScoped<IMessageRepository, MessageRepositiory>();
//builder.Services.AddScoped<ITestResualtService, TestResaultService>();
//builder.Services.AddScoped<ITestResualtRepository, TestResaltRepository>();
//builder.Services.AddScoped<ITurnService, TurnService>();
//builder.Services.AddScoped<ITurnRepository, TurnRepository>();
//builder.Services.AddScoped<IUserService, UserService>();
//builder.Services.AddScoped<IUserRepository, UserRepository>();

//builder.Services.AddAutoMapper(typeof(MappingProfile));

//// Register S3Service as Scoped (not Singleton) for better error handling
//builder.Services.AddScoped<S3Service>();
//builder.Services.AddDbContext<DataContext>();

//// CORS Configuration
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowReactApp", policy =>
//    {
//        policy.WithOrigins(
//                "http://localhost:5173",
//                "https://localhost:5173",
//                "http://localhost:3000",
//                "https://localhost:3000",
//                "http://localhost:5174" // Add common Vite port
//              )
//              .AllowAnyMethod()
//              .AllowAnyHeader()
//              .AllowCredentials();
//    });
//});

////// JWT Authentication
////builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
////    .AddJwtBearer(options =>
////    {
////        options.TokenValidationParameters = new TokenValidationParameters
////        {
////            ValidateIssuer = true,
////            ValidateAudience = true,
////            ValidateLifetime = true,
////            ValidateIssuerSigningKey = true,
////            ValidIssuer = builder.Configuration["JWT_ISSUER"], // Updated key name
////            ValidAudience = builder.Configuration["JWT_AUDIENCE"], // Updated key name
////            IssuerSigningKey = new SymmetricSecurityKey(
////                Encoding.UTF8.GetBytes(builder.Configuration["JWT_KEY"]) // Updated key name
////            )
////        };
////    });

//// Swagger Configuration
//builder.Services.AddSwaggerGen(options =>
//{
//    options.SwaggerDoc("v1", new OpenApiInfo { Title = "FinalProject API", Version = "v1" });

//    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
//    {
//        Description = "JWT Authorization header using the Bearer scheme.",
//        Name = "Authorization",
//        In = ParameterLocation.Header,
//        Type = SecuritySchemeType.ApiKey,
//        Scheme = "Bearer"
//    });

//    options.AddSecurityRequirement(new OpenApiSecurityRequirement
//    {
//        {
//            new OpenApiSecurityScheme
//            {
//                Reference = new OpenApiReference
//                {
//                    Type = ReferenceType.SecurityScheme,
//                    Id = "Bearer"
//                }
//            },
//            new string[] {}
//        }
//    });
//});
//if (File.Exists(".env"))
//{
//    foreach (var line in File.ReadAllLines(".env"))
//    {
//        if (string.IsNullOrWhiteSpace(line) || line.StartsWith("#"))
//            continue;

//        var parts = line.Split('=', 2);
//        if (parts.Length == 2)
//        {
//            Environment.SetEnvironmentVariable(parts[0].Trim(), parts[1].Trim());
//        }
//    }
//}


//var app = builder.Build();

//// Configure the HTTP request pipeline
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//// Add global exception handling middleware
////app.UseMiddleware<GlobalExceptionMiddleware>();

//// CORS before UseRouting
//app.UseCors("AllowReactApp");

//app.UseHttpsRedirection();
//app.UseRouting();

//// Authentication & Authorization
////app.UseAuthentication();
////app.UseAuthorization();

//app.MapControllers();

//app.Run();











using FinalProject.Core;
using FinalProject.Core.IRepositories;
using FinalProject.Core.IServices;
using FinalProject.Data;
using FinalProject.Data.Repositories;
using FinalProject.Service.Services;
using Microsoft.OpenApi.Models;
using System.Text.Json.Serialization;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;

// Load environment variables from .env file
Env.Load();

var builder = WebApplication.CreateBuilder(args);

//// Add environment variables to configuration
//foreach (System.Collections.DictionaryEntry envVar in Environment.GetEnvironmentVariables())
//{
//    builder.Configuration[envVar.Key.ToString()] = envVar.Value?.ToString();
//}
foreach (System.Collections.DictionaryEntry envVar in Environment.GetEnvironmentVariables())
{
    if (envVar.Key != null)
    {
        string key = envVar.Key.ToString()!;
        string? value = envVar.Value?.ToString();

        builder.Configuration[key] = value ?? string.Empty;
    }
}

// Add services to the container
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.WriteIndented = true;
});

builder.Services.AddHttpClient();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register Services & Repositories
builder.Services.AddScoped<IDoctorService, DoctorService>();
builder.Services.AddScoped<IDoctorRepository, DoctorRepository>();
builder.Services.AddScoped<IMessageService, MessageService>();
builder.Services.AddScoped<IMessageRepository, MessageRepositiory>();
builder.Services.AddScoped<ITestResualtService, TestResaultService>();
builder.Services.AddScoped<ITestResualtRepository, TestResaltRepository>();
builder.Services.AddScoped<ITurnService, TurnService>();
builder.Services.AddScoped<ITurnRepository, TurnRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddScoped<S3Service>();
//builder.Services.AddDbContext<DataContext>();

// CORS Configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllDevClients", policy =>
    {
        policy.WithOrigins(
                "http://localhost:5173",
                "https://localhost:5173",
                "http://localhost:3000",
                "https://localhost:3000",
                "http://localhost:5174",
                "http://localhost:4200",
                "https://localhost:4200"
              )
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

// JWT Authentication (אם תרצה להפעיל, הסר את ההערות)
//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//    .AddJwtBearer(options =>
//    {
//        options.TokenValidationParameters = new TokenValidationParameters
//        {
//            ValidateIssuer = true,
//            ValidateAudience = true,
//            ValidateLifetime = true,
//            ValidateIssuerSigningKey = true,
//            ValidIssuer = builder.Configuration["JWT_ISSUER"],
//            ValidAudience = builder.Configuration["JWT_AUDIENCE"],
//            IssuerSigningKey = new SymmetricSecurityKey(
//                Encoding.UTF8.GetBytes(builder.Configuration["JWT_KEY"])
//            )
//        };
//    });

// Swagger Configuration
var connectionString = Environment.GetEnvironmentVariable("CONECCTION_STRING");

builder.Services.AddDbContext<DataContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "FinalProject API", Version = "v1" });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme.",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

// Load .env manually for safety in production (redundant if Env.Load() works properly)
if (File.Exists(".env"))
{
    foreach (var line in File.ReadAllLines(".env"))
    {
        if (string.IsNullOrWhiteSpace(line) || line.StartsWith("#"))
            continue;

        var parts = line.Split('=', 2);
        if (parts.Length == 2)
        {
            Environment.SetEnvironmentVariable(parts[0].Trim(), parts[1].Trim());
        }
    }
}

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Global exception handler middleware (אם קיים)
// app.UseMiddleware<GlobalExceptionMiddleware>();

app.UseCors("AllowAllDevClients");

app.UseHttpsRedirection();
app.UseRouting();

// Authentication & Authorization (אם מופעל)
// app.UseAuthentication();
// app.UseAuthorization();

app.MapControllers();
app.MapGet("/", () => "final project is runing");
app.Run();
