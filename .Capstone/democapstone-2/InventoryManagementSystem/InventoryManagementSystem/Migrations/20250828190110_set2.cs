using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InventoryManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class set2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 8, 28, 19, 1, 9, 668, DateTimeKind.Utc).AddTicks(8759));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 8, 28, 19, 1, 9, 668, DateTimeKind.Utc).AddTicks(8762));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 8, 28, 19, 1, 9, 668, DateTimeKind.Utc).AddTicks(8764));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 8, 28, 19, 1, 9, 668, DateTimeKind.Utc).AddTicks(8783));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "Password" },
                values: new object[] { new DateTime(2025, 8, 28, 19, 1, 9, 364, DateTimeKind.Utc).AddTicks(4343), "$2a$11$HKh0q3G5YOnk3MJ46/2RlOCLw9N7GaYqQHGUVhQSP7NUS1QL9lm5a" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "Password" },
                values: new object[] { new DateTime(2025, 8, 28, 19, 1, 9, 523, DateTimeKind.Utc).AddTicks(640), "$2a$11$TCHNxxYa0lZPrNQBCWSLxOWT29vRt5TsjQe/lXxkBU8boq4hYWbUS" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "Password" },
                values: new object[] { new DateTime(2025, 8, 28, 19, 1, 9, 668, DateTimeKind.Utc).AddTicks(8008), "$2a$11$rmnaslsFZf97a9fGTTMX4eMvqiBvXdU0RN21lhU9EUnrbpVWpmKcC" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 8, 28, 17, 57, 48, 615, DateTimeKind.Utc).AddTicks(652));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 8, 28, 17, 57, 48, 615, DateTimeKind.Utc).AddTicks(655));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 8, 28, 17, 57, 48, 615, DateTimeKind.Utc).AddTicks(657));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 8, 28, 17, 57, 48, 615, DateTimeKind.Utc).AddTicks(671));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "Password" },
                values: new object[] { new DateTime(2025, 8, 28, 17, 57, 48, 337, DateTimeKind.Utc).AddTicks(5715), "$2a$11$yyJG9D24LDABeZqlsU53c.mDllfKRKoyB2jfqGTzxx1FeJ4TmahkG" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "Password" },
                values: new object[] { new DateTime(2025, 8, 28, 17, 57, 48, 475, DateTimeKind.Utc).AddTicks(7296), "$2a$11$KJrQYQF2J3pqz6mXLfeIH.G3rOsf3y1iq/owguQXrVI6KWz3XcuGC" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "Password" },
                values: new object[] { new DateTime(2025, 8, 28, 17, 57, 48, 615, DateTimeKind.Utc).AddTicks(88), "$2a$11$ikkMk4OTvIQKzV9ADTrT5OCDC5r6sXHOfCbZSeishGHWGU828QzN6" });
        }
    }
}
