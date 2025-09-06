using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InventoryManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class fixedapproval : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserApprovals_Users_ReviewedByAdminId",
                table: "UserApprovals");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 8, 29, 10, 45, 2, 17, DateTimeKind.Utc).AddTicks(3209));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 8, 29, 10, 45, 2, 17, DateTimeKind.Utc).AddTicks(3215));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 8, 29, 10, 45, 2, 17, DateTimeKind.Utc).AddTicks(3217));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 8, 29, 10, 45, 2, 17, DateTimeKind.Utc).AddTicks(3241));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "Password" },
                values: new object[] { new DateTime(2025, 8, 29, 10, 45, 1, 679, DateTimeKind.Utc).AddTicks(623), "$2a$11$CBK9Y8COcafOR/z/chxS3.cnz9eYBGfP4U6ED5BSREO7e08asTc6a" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "Password" },
                values: new object[] { new DateTime(2025, 8, 29, 10, 45, 1, 852, DateTimeKind.Utc).AddTicks(1518), "$2a$11$iTJ79w2qIMpoD9cX9HHfoOI8o2VqK/JqWb3Cb8c7qZEbPzz2a./Ny" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "Password" },
                values: new object[] { new DateTime(2025, 8, 29, 10, 45, 2, 17, DateTimeKind.Utc).AddTicks(1933), "$2a$11$D0rdGgJiWYHPTaobexUw0e.PtC.c2BuOksyqaFqOgSBgYlxqYLZsW" });

            migrationBuilder.AddForeignKey(
                name: "FK_UserApprovals_Users_ReviewedByAdminId",
                table: "UserApprovals",
                column: "ReviewedByAdminId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserApprovals_Users_ReviewedByAdminId",
                table: "UserApprovals");

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

            migrationBuilder.AddForeignKey(
                name: "FK_UserApprovals_Users_ReviewedByAdminId",
                table: "UserApprovals",
                column: "ReviewedByAdminId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
