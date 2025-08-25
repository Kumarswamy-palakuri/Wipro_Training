using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SecureShoppingApp.Data.Migrations
{
    /// <inheritdoc />
    public partial class FixDecimalAndSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 8, 22, 18, 57, 2, 706, DateTimeKind.Utc).AddTicks(4799));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 8, 22, 18, 57, 2, 706, DateTimeKind.Utc).AddTicks(5843));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 8, 22, 18, 57, 2, 706, DateTimeKind.Utc).AddTicks(5845));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 8, 22, 18, 51, 38, 33, DateTimeKind.Utc).AddTicks(6882));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 8, 22, 18, 51, 38, 33, DateTimeKind.Utc).AddTicks(8642));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 8, 22, 18, 51, 38, 33, DateTimeKind.Utc).AddTicks(8648));
        }
    }
}
