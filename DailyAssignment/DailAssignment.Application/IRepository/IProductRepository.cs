using Shared.DTO;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DailyAssignment.Application.IRepository
{
    public interface IProductRepository
    {
        Task AddToCart(int userId, int productId, int quantity);
        Task<IEnumerable<CartItemDTO>> GetCartItems(string userEmail);
        Task RemoveFromCart(string userEmail, int productId);
        Task ClearCart(string userEmail);
    }
}
