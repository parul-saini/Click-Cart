using Microsoft.EntityFrameworkCore;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DailyAssignment.Infrastructure.DataBaseContext
{
    public class UserDbContext :DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options) { 
        }

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Seller> Sellers { get; set; }
        public virtual DbSet<Admin> Admins { get; set; }

        public virtual DbSet<Product> Products { get; set; }

        public virtual DbSet<Cart> Carts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("Customer_p");
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasIndex(u => u.email)
                .IsUnique();

            modelBuilder.Entity<Seller>().ToTable("Seller_p");
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Seller>()
                .HasIndex(u => u.email)
                .IsUnique();
            
            modelBuilder.Entity<Admin>().ToTable("Admin_p");
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Admin>()
                .HasIndex(u => u.email)
                .IsUnique();

            modelBuilder.Entity<Product>().ToTable("Product_p");

            // Configure one-to-many relationship in seller and prod
            modelBuilder.Entity<Product>()
                .HasOne(p => p.Seller)
                .WithMany()
                .HasForeignKey(p => p.SellerId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Cart>().ToTable("Cart_p");

            base.OnModelCreating(modelBuilder);
        }
    }
}
