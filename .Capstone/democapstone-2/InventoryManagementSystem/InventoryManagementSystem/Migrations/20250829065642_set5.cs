using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InventoryManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class set5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 8, 29, 6, 56, 42, 6, DateTimeKind.Utc).AddTicks(5257));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 8, 29, 6, 56, 42, 6, DateTimeKind.Utc).AddTicks(5260));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 8, 29, 6, 56, 42, 6, DateTimeKind.Utc).AddTicks(5262));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 8, 29, 6, 56, 42, 6, DateTimeKind.Utc).AddTicks(5275));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "Password" },
                values: new object[] { new DateTime(2025, 8, 29, 6, 56, 41, 726, DateTimeKind.Utc).AddTicks(9932), "$2a$11$xWj4jb2LUTs/P2gg8ovXwuMVf0rA5Mh2Dj3Q4RI8T5Tw6FBFz23bS" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "Password" },
                values: new object[] { new DateTime(2025, 8, 29, 6, 56, 41, 867, DateTimeKind.Utc).AddTicks(5834), "$2a$11$y5PHP02xQzEHFJYOHQ.8d.reGBjN1e..CJkwMPB.hmglAR0kWTNQ2" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "Password" },
                values: new object[] { new DateTime(2025, 8, 29, 6, 56, 42, 6, DateTimeKind.Utc).AddTicks(4437), "$2a$11$9ru94oOf5g.uPdZ28wD1kOItCCV69lawVxw0d0HkgM86PPN7Eh1/y" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
    }
}
