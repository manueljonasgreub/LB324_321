using Microsoft.EntityFrameworkCore;
using ProductService;

Console.WriteLine("Start");
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

Console.WriteLine("1");
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLiveServer", policy =>
    {
        policy.WithOrigins("http://127.0.0.1:5500", "http://localhost:5500") // Live Server URL
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
Console.WriteLine("2");

builder.Services.AddDbContext<ProductContext>(options =>
    options.UseSqlite("Data Source=/app/ProductService-data/products.db"));
Console.WriteLine("3");

var app = builder.Build();
Console.WriteLine("4");

using (var scope = app.Services.CreateScope())
{
    Console.WriteLine("5");
    var db = scope.ServiceProvider.GetRequiredService<ProductContext>();
    try
    {

        Console.WriteLine("Database created successfully");
    }
    catch (Exception ex)
    {
        Console.WriteLine("Error creating database: " + ex.Message);
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseCors("AllowLiveServer");

app.UseAuthorization();

app.MapControllers();

app.Run();
