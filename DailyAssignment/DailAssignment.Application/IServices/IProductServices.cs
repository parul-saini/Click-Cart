using Shared.DTO;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DailyAssignment.Application.IServices
{
    public interface IProductServices
    {
        Task AddToCart(AddToCartRequest addToCartItem, string userEmail);
        Task<IEnumerable<CartItemDTO>> GetCartItems(string userEmail);
        Task RemoveFromCart(string userEmail, int productId);
        Task ClearCart(string userEmail);
    }

}
