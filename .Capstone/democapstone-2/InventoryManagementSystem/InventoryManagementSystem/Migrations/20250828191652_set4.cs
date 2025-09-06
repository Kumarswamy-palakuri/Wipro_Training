using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InventoryManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class set4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 8, 28, 19, 16, 52, 235, DateTimeKind.Utc).AddTicks(3514));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 8, 28, 19, 16, 52, 235, DateTimeKind.Utc).AddTicks(3517));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 8, 28, 19, 16, 52, 235, DateTimeKind.Utc).AddTicks(3519));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 8, 28, 19, 16, 52, 235, DateTimeKind.Utc).AddTicks(3530));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "Password" },
                values: new object[] { new DateTime(2025, 8, 28, 19, 16, 51, 934, DateTimeKind.Utc).AddTicks(2347), "$2a$11$9dozPMzmf2XeKbdzvv0fQuLXARBFNyZZsziOoacmGeHNYM8k.7dPe" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "Password" },
                values: new object[] { new DateTime(2025, 8, 28, 19, 16, 52, 86, DateTimeKind.Utc).AddTicks(8518), "$2a$11$5l8ar1PPSMSwt7GGJygLgeGemw/Qhv8zqt3klbBYbOFh1K5iQE0Ju" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "Password" },
                values: new object[] { new DateTime(2025, 8, 28, 19, 16, 52, 235, DateTimeKind.Utc).AddTicks(2829), "$2a$11$SJg2djucos4ZcAyiZmVIDunjbhiBegLB600OsqiMmFAgOfbI/Q5UO" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
    }
}
