////using FinalProject.Core;
////using FinalProject.Core.IRepositories;
////using FinalProject.Core.IServices;
////using FinalProject.Data;
////using FinalProject.Data.Repositories;
////using FinalProject.Service.Services;
////using Microsoft.OpenApi.Models;
////using System.Text.Json.Serialization;
////using DotNetEnv;
////using Microsoft.EntityFrameworkCore;
////using Microsoft.AspNetCore.Http.Features;

////Env.Load();

////var builder = WebApplication.CreateBuilder(args);


////builder.Services.AddControllers();
////builder.Services.AddEndpointsApiExplorer();


////builder.Services.AddControllers().AddJsonOptions(options =>
////{
////    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
////    options.JsonSerializerOptions.WriteIndented = true;
////});

////builder.Services.AddEndpointsApiExplorer();

////builder.Services.AddCors(opt =>
////opt.AddPolicy("MyPolicy", policy =>
////{
////    policy.WithOrigins("https://fullstackprojectfrontendreact.onrender.com",
////                       "https://fullstackprojectfrontendangular.onrender.com")
////      .AllowAnyHeader()
////      .AllowAnyMethod();
////    //.AllowCredentials();
////}));


////builder.Services.AddScoped<IDoctorService, DoctorService>();
////builder.Services.AddScoped<IDoctorRepository, DoctorRepository>();
////builder.Services.AddScoped<IMessageService, MessageService>();
////builder.Services.AddScoped<IMessageRepository, MessageRepositiory>();
////builder.Services.AddScoped<ITestResualtService, TestResaultService>();
////builder.Services.AddScoped<ITestResualtRepository, TestResaltRepository>();
////builder.Services.AddScoped<ITurnService, TurnService>();
////builder.Services.AddScoped<ITurnRepository, TurnRepository>();
////builder.Services.AddScoped<IUserService, UserService>();
////builder.Services.AddScoped<IUserRepository, UserRepository>();
////builder.Services.AddAutoMapper(typeof(MappingProfile));
////builder.Services.AddSingleton<S3Service>();

////builder.Services.AddDbContext<DataContext>(options =>
////{
////    var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");
////    Console.WriteLine($"Connection string: {connectionString}");
////    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
////           .EnableSensitiveDataLogging()
////           .LogTo(Console.WriteLine);
////});



////builder.Services.AddSwaggerGen(options =>
////{
////    options.SwaggerDoc("v1", new OpenApiInfo { Title = "Pictures API", Version = "v1" });

////    options.CustomSchemaIds(type => type.FullName);
////    options.DescribeAllParametersInCamelCase();
////    options.IgnoreObsoleteActions();
////    options.IgnoreObsoleteProperties();

////    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
////    {
////        Description = "JWT Authorization header using the Bearer scheme.",
////        Name = "Authorization",
////        In = ParameterLocation.Header,
////        Type = SecuritySchemeType.ApiKey,
////        Scheme = "Bearer"
////    });

////    options.AddSecurityRequirement(new OpenApiSecurityRequirement
////    {
////        {
////            new OpenApiSecurityScheme
////            {
////                Reference = new OpenApiReference
////                {
////                    Type = ReferenceType.SecurityScheme,
////                    Id = "Bearer"
////                }
////            },
////            Array.Empty<string>()
////        }
////    });
////});

////// Load .env manually for safety in production (redundant if Env.Load() works properly)
////if (File.Exists(".env"))
////{
////    foreach (var line in File.ReadAllLines(".env"))
////    {
////        if (string.IsNullOrWhiteSpace(line) || line.StartsWith("#"))
////            continue;

////        var parts = line.Split('=', 2);
////        if (parts.Length == 2)
////        {
////            Environment.SetEnvironmentVariable(parts[0].Trim(), parts[1].Trim());
////        }
////    }
////}


////builder.Services.Configure<FormOptions>(options =>
////{
////    options.MultipartBodyLengthLimit = 100_000_000;
////});

////var app = builder.Build();


////app.UseSwagger();
////app.UseSwaggerUI(c =>
////{
////    c.SwaggerEndpoint("/swagger/v1/swagger.json", "FinalProject API v1");
////    c.RoutePrefix = "swagger";
////});

////app.UseHttpsRedirection();
////app.UseRouting();
////app.UseCors("MyPolicy");

////app.MapControllers();
////app.MapGet("/", () => "final project is runing");
////app.Run();















//using FinalProject.Core;
//using FinalProject.Core.IRepositories;
//using FinalProject.Core.IServices;
//using FinalProject.Data;
//using FinalProject.Data.Repositories;
//using FinalProject.Service.Services;
//using Microsoft.OpenApi.Models;
//using System.Text.Json.Serialization;
//using DotNetEnv;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.AspNetCore.Http.Features;

//Env.Load();

//var builder = WebApplication.CreateBuilder(args);

//builder.Services.AddControllers();
//builder.Services.AddEndpointsApiExplorer();

//builder.Services.AddControllers().AddJsonOptions(options =>
//{
//    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
//    options.JsonSerializerOptions.WriteIndented = true;
//});

//builder.Services.AddEndpointsApiExplorer();

//// Updated CORS configuration
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("MyPolicy", policy =>
//    {
//        policy.WithOrigins(
//                "https://fullstackprojectfrontendreact.onrender.com",
//                "https://fullstackprojectfrontendangular.onrender.com"
//            )
//            .AllowAnyHeader()
//            .AllowAnyMethod();
//    });
//});

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
//builder.Services.AddSingleton<S3Service>();

//builder.Services.AddDbContext<DataContext>(options =>
//{
//    var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");
//    Console.WriteLine($"Connection string: {connectionString}");
//    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
//           .EnableSensitiveDataLogging()
//           .LogTo(Console.WriteLine);
//});

//builder.Services.AddSwaggerGen(options =>
//{
//    options.SwaggerDoc("v1", new OpenApiInfo { Title = "Pictures API", Version = "v1" });
//    options.CustomSchemaIds(type => type.FullName);
//    options.DescribeAllParametersInCamelCase();
//    options.IgnoreObsoleteActions();
//    options.IgnoreObsoleteProperties();

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
//            Array.Empty<string>()
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

//builder.Services.Configure<FormOptions>(options =>
//{
//    options.MultipartBodyLengthLimit = 100_000_000;
//});

//var app = builder.Build();

//app.UseSwagger();
//app.UseSwaggerUI(c =>
//{
//    c.SwaggerEndpoint("/swagger/v1/swagger.json", "FinalProject API v1");
//    c.RoutePrefix = "swagger";
//});

//app.UseHttpsRedirection();
//app.UseRouting();

//// IMPORTANT: CORS must be configured BEFORE authorization and controllers
//app.UseCors("MyPolicy");

//app.MapControllers();
//app.MapGet("/", () => "final project is runing");
//app.Run();

























using FinalProject.Core;
using FinalProject.Core.IRepositories;
using FinalProject.Core.IServices;
using FinalProject.Data;
using FinalProject.Data.Repositories;
using FinalProject.Service.Services;
using Microsoft.OpenApi.Models;
using System.Text.Json.Serialization;
using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.Features;

Env.Load();

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.WriteIndented = true;
});

// Fixed CORS configuration - more permissive for debugging
builder.Services.AddCors(options =>
{
    options.AddPolicy("MyPolicy", policy =>
    {
        policy.WithOrigins(
                "https://fullstackprojectfrontendreact.onrender.com",
                "https://fullstackprojectfrontendangular.onrender.com",
                "http://localhost:3000", // Add for local development
                "https://localhost:3000"
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .SetIsOriginAllowed(origin => true) // For debugging - remove in production
            .AllowCredentials(); // Only if your frontend sends credentials
    });
});

// Alternative simpler CORS for debugging:
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("MyPolicy", policy =>
//     {
//         policy.AllowAnyOrigin()
//               .AllowAnyHeader()
//               .AllowAnyMethod();
//     });
// });

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
builder.Services.AddSingleton<S3Service>();

// Add error handling for database connection
builder.Services.AddDbContext<DataContext>(options =>
{
    var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");

    if (string.IsNullOrEmpty(connectionString))
    {
        Console.WriteLine("WARNING: CONNECTION_STRING environment variable is not set!");
        // Fallback or throw exception
        throw new InvalidOperationException("CONNECTION_STRING environment variable is required");
    }

    Console.WriteLine($"Connection string configured: {connectionString.Substring(0, Math.Min(20, connectionString.Length))}...");

    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
           .EnableSensitiveDataLogging()
           .LogTo(Console.WriteLine);
});

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "FinalProject API", Version = "v1" });
    options.CustomSchemaIds(type => type.FullName);
    options.DescribeAllParametersInCamelCase();
    options.IgnoreObsoleteActions();
    options.IgnoreObsoleteProperties();

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
            Array.Empty<string>()
        }
    });
});

// Load .env file manually
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

// Configure file upload limits
builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 100_000_000; // 100MB
});

var app = builder.Build();

// Enable Swagger in all environments for debugging
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "FinalProject API v1");
    c.RoutePrefix = "swagger";
});

// Add global exception handling
app.UseExceptionHandler(appError =>
{
    appError.Run(async context =>
    {
        context.Response.StatusCode = 500;
        context.Response.ContentType = "application/json";

        var contextFeature = context.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerFeature>();
        if (contextFeature != null)
        {
            Console.WriteLine($"Global Exception: {contextFeature.Error}");

            await context.Response.WriteAsync(new
            {
                StatusCode = context.Response.StatusCode,
                Message = "An error occurred processing your request.",
                Details = contextFeature.Error.Message // Remove in production
            }.ToString());
        }
    });
});

app.UseHttpsRedirection();
app.UseRouting();

// CORS must be before authorization
app.UseCors("MyPolicy");

app.MapControllers();
app.MapGet("/", () => "Final project is running");

// Add health check endpoint
app.MapGet("/health", () => new { status = "healthy", timestamp = DateTime.UtcNow });

app.Run();