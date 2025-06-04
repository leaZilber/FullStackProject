using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinalProject.Data.Migrations
{
    /// <inheritdoc />
    public partial class clevercloud : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "doctorList",
                columns: table => new
                {
                    DoctorId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    DoctorName = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FieldOfSpecialization = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LicenseNumber = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_doctorList", x => x.DoctorId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "messagesList",
                columns: table => new
                {
                    MessageId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    SenderId = table.Column<int>(type: "int", nullable: false),
                    MessageContent = table.Column<string>(type: "varchar(250)", maxLength: 250, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MessageDate = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_messagesList", x => x.MessageId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "testResaultList",
                columns: table => new
                {
                    TestId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    TestDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ImgURL = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Summary = table.Column<string>(type: "varchar(250)", maxLength: 250, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_testResaultList", x => x.TestId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "turnList",
                columns: table => new
                {
                    TurnId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    DoctorName = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DateTurn = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    TurnLocate = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Hour = table.Column<string>(type: "varchar(10)", maxLength: 10, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ArrivalConfirmation = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_turnList", x => x.TurnId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "userList",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserName = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserEmail = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserEncryptedPassword = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserRole = table.Column<string>(type: "varchar(5)", maxLength: 5, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserPhone = table.Column<string>(type: "varchar(10)", maxLength: 10, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserAddress = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserBirth = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UserCreateDate = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_userList", x => x.UserId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "doctorList");

            migrationBuilder.DropTable(
                name: "messagesList");

            migrationBuilder.DropTable(
                name: "testResaultList");

            migrationBuilder.DropTable(
                name: "turnList");

            migrationBuilder.DropTable(
                name: "userList");
        }
    }
}
