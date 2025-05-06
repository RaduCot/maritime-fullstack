using Microsoft.EntityFrameworkCore;
using MaritimeApi.Data;

var builder = WebApplication.CreateBuilder(args);

// CORS POLICY
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin() // Should be replaced with .WithOrigins("http://example.com")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddControllers();
builder.Services.AddDbContext<MaritimeContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use CORS before routing and authorization
app.UseCors("AllowAll");

app.UseAuthorization();
app.MapControllers();
app.Run();
