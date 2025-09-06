using democapstone.Models;

namespace democapstone.Data;

public static class DbSeeder
{
	public static void Seed(AppDbContext db)
	{
		if (!db.Users.Any())
		{
			db.Users.AddRange(
				new User { Username = "admin", PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"), Role = "Admin" },
				new User { Username = "manager", PasswordHash = BCrypt.Net.BCrypt.HashPassword("manager123"), Role = "Manager" },
				new User { Username = "staff", PasswordHash = BCrypt.Net.BCrypt.HashPassword("staff123"), Role = "Staff" }
			);
		}

		if (!db.Products.Any())
		{
			db.Products.AddRange(
				new Product { Name = "Laptop", Quantity = 10, Price = 1200 },
				new Product { Name = "Mouse", Quantity = 50, Price = 20 },
				new Product { Name = "Desk", Quantity = 5, Price = 200 }
			);
		}

		db.SaveChanges();
	}
}
