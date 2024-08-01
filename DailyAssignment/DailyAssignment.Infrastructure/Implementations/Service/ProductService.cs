using DailyAssignment.Application.IRepository;
using DailyAssignment.Application.IServices;
using Shared.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DailyAssignment.Infrastructure.Implementations.Service
{
    public class ProductService : IProductServices
    {
        private readonly IProductRepository _productRepository;
        private readonly IUserRepository _userRepository;
        public ProductService(IProductRepository productRepository, IUserRepository userRepository) { 
            _productRepository = productRepository;
            _userRepository = userRepository;
        }
        public async Task AddToCart(AddToCartRequest addToCartItem, string userEmail)
        {
            var user = await _userRepository.GetUserByEmail(userEmail);

             await  _productRepository.AddToCart(user.UserId, addToCartItem.ProductId, addToCartItem.orderQuantity);

        }

        public async Task<IEnumerable<CartItemDTO>> GetCartItems(string userEmail)
        {
            // var user = await _userRepository.GetUserByEmail(userEmail);
           return  await _productRepository.GetCartItems(userEmail);
        }

        public async Task RemoveFromCart(string userEmail, int productId)
        {
            await _productRepository.RemoveFromCart(userEmail, productId);
        }

        public async Task ClearCart(string userEmail)
        {
            await _productRepository.ClearCart(userEmail);
        }
    }
}
