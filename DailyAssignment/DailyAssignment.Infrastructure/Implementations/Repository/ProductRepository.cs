using DailyAssignment.Application.IRepository;
using DailyAssignment.Infrastructure.DataBaseContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;
using Microsoft.EntityFrameworkCore;
using Shared.DTO;

namespace DailyAssignment.Infrastructure.Implementations.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly UserDbContext _userDbContext;
        public ProductRepository(UserDbContext userDbContext) {
            _userDbContext = userDbContext;  
        }

        public async Task AddToCart(int userId, int productId, int quantity)
        {
            var cartItem = await _userDbContext.Carts.FirstOrDefaultAsync(c => c.userId == userId && c.productId == productId);
            if (cartItem == null)
            {
                cartItem = new Cart { userId = userId, productId = productId, orderQuantity = quantity };
                await _userDbContext.Carts.AddAsync(cartItem);
            }
            else
            {
                cartItem.orderQuantity += quantity;
            }

            await _userDbContext.SaveChangesAsync();
        }
       
        public async Task<IEnumerable<CartItemDTO>> GetCartItems(string userEmail)
        {
            var user = await _userDbContext.Users.FirstOrDefaultAsync(u => u.email == userEmail);
            if (user == null)
            {
                throw new Exception("User not found");
            }

            var cartItems = await (from cart in _userDbContext.Carts
                                   join product in _userDbContext.Products on cart.productId equals product.PId
                                   where cart.userId == user.UserId
                                   select new CartItemDTO
                                   {
                                       CartId = cart.cartId,
                                       ProductId = product.PId,
                                       Quantity = cart.orderQuantity,
                                       ProductName = product.productName,
                                       ProductDescription = product.productDescription,
                                       ProductCategory = product.productCategory,
                                       ImageUrl = product.imageUrl,
                                       Amount = product.amount
                                   }).ToListAsync();

            return cartItems;
        }
        public async Task RemoveFromCart(string userEmail, int productId)
        {
            var user = await _userDbContext.Users.FirstOrDefaultAsync(u => u.email == userEmail);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            var cartItem = await _userDbContext.Carts.FirstOrDefaultAsync(c => c.userId == user.UserId && c.productId == productId);
            if (cartItem != null)
            {
                _userDbContext.Carts.Remove(cartItem);
                await _userDbContext.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Cart item not found");
            }

        }

        public async Task ClearCart(string userEmail)
        {
            var user = await _userDbContext.Users.FirstOrDefaultAsync(u => u.email == userEmail);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            var cartItems = _userDbContext.Carts.Where(c => c.userId == user.UserId);
            _userDbContext.Carts.RemoveRange(cartItems);
            await _userDbContext.SaveChangesAsync();

        }
    }
}
