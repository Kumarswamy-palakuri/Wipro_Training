using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InventoryManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class fixedapproval1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId1",
                table: "UserApprovals",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 8, 29, 11, 1, 1, 148, DateTimeKind.Utc).AddTicks(565));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 8, 29, 11, 1, 1, 148, DateTimeKind.Utc).AddTicks(573));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 8, 29, 11, 1, 1, 148, DateTimeKind.Utc).AddTicks(579));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 8, 29, 11, 1, 1, 148, DateTimeKind.Utc).AddTicks(611));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "Password" },
                values: new object[] { new DateTime(2025, 8, 29, 11, 1, 0, 412, DateTimeKind.Utc).AddTicks(503), "$2a$11$0hxUJBH/TIxiiIHhKqJ7ye37/CqLJeJBmqYXTplgZ7mBGWxqUk3hK" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "Password" },
                values: new object[] { new DateTime(2025, 8, 29, 11, 1, 0, 774, DateTimeKind.Utc).AddTicks(316), "$2a$11$IdgChxvfhDC/zi1l8/m4suDDtJzGwpm1wbxz1gHFPPdvcfmbRN0fK" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "Password" },
                values: new object[] { new DateTime(2025, 8, 29, 11, 1, 1, 147, DateTimeKind.Utc).AddTicks(7960), "$2a$11$/eLUASelT2UtrI6R3cpQuuMfAb0u/3zIeoCi.7dOg9PHgwBjOvl0." });

            migrationBuilder.CreateIndex(
                name: "IX_UserApprovals_UserId1",
                table: "UserApprovals",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_UserApprovals_Users_UserId1",
                table: "UserApprovals",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserApprovals_Users_UserId1",
                table: "UserApprovals");

            migrationBuilder.DropIndex(
                name: "IX_UserApprovals_UserId1",
                table: "UserApprovals");

            migrationBuilder.DropColumn(
                name: "UserId1",
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
        }
    }
}
