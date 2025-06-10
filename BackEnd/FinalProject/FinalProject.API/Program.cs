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

//builder.Services.AddCors(opt =>
//opt.AddPolicy("MyPolicy", policy =>
//{
//    policy.WithOrigins("https://fullstackprojectfrontendreact.onrender.com",
//                       "https://fullstackprojectfrontendangular.onrender.com")
//      .AllowAnyHeader()
//      .AllowAnyMethod();
//      //.AllowCredentials();
//}));


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

//// Load .env manually for safety in production (redundant if Env.Load() works properly)
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

builder.Services.AddEndpointsApiExplorer();

// תיקון ההגדרה של CORS - פתרון יותר פתוח
builder.Services.AddCors(opt =>
    opt.AddPolicy("MyPolicy", policy =>
    {
        policy.AllowAnyOrigin()  // מתיר מכל מקום - פחות בטוח אבל יעבוד
            .AllowAnyHeader()
            .AllowAnyMethod();

        // אלטרנטיבה יותר בטוחה:
        /*
        policy.WithOrigins(
                "https://fullstackprojectfrontendreact.onrender.com",
                "https://fullstackprojectfrontendangular.onrender.com"
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .SetIsOriginAllowed(origin => true); // מתיר מכל origin
        */
    }));

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

builder.Services.AddDbContext<DataContext>(options =>
{
    var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");
    Console.WriteLine($"Connection string: {connectionString}");
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
           .EnableSensitiveDataLogging()
           .LogTo(Console.WriteLine);
});

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "Pictures API", Version = "v1" });

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

// Load .env manually for safety in production
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

builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 100_000_000;
});

var app = builder.Build();

// הוסף CORS לפני הכל!
app.UseCors("MyPolicy");

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "FinalProject API v1");
    c.RoutePrefix = "swagger";
});

app.UseHttpsRedirection();
app.UseRouting();

// הסר את middleware הזה - זה עלול ליצור קונפליקט
// app.Use(async (context, next) => ...

app.MapControllers();
app.MapGet("/", () => "final project is running");
app.Run();
