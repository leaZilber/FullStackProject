using FinalProject.Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace FinalProject.Data
{
    public class DataContext : DbContext
    {
        public DbSet<User> userList { get; set; }
        public DbSet<Doctor> doctorList { get; set; }
        public DbSet<Turn> turnList { get; set; }
        public DbSet<Message> messagesList { get; set; }
        //public DbSet<Schedule> scheduleList { get; set; }
        public DbSet<TestResualt> testResaultList { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=my_db");
        }
    }
}
