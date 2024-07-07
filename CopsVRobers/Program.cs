var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// builder.WebHost.ConfigureKestrel(options =>
// {
//     options.ListenAnyIP(8080); // HTTP
//     // options.ListenAnyIP(443, listenOptions =>
//     // {
//     //     // listenOptions.UseHttps("Certificates.pfx", "password"); // Use your certificate path and password
//     //     // listenOptions.UseHttps();
//     // });
// });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseWebSockets();
app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
