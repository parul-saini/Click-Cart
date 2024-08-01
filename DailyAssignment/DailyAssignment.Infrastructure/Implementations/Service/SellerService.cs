using DailyAssignment.Application.IRepository;
using DailyAssignment.Application.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;
using Shared.DTO;

namespace DailyAssignment.Infrastructure.Implementations.Service
{
    public class SellerService : ISellerService
    {
        private readonly ISellerRepository _sellerRepository;
        public SellerService(ISellerRepository sellerRepository)
        {
            _sellerRepository = sellerRepository;
        }

        public Task AddNewSeller(Seller _user)
        {
           return _sellerRepository.AddNewSeller(_user);
        }
        public async Task<List<Seller>> GetAllSellers()
        {
            return await _sellerRepository.GetAllSellers();
        }

        public async Task<Seller> IsSellerLogin(string email, string password)
        {
            return await _sellerRepository.IsSellerLogin(email, password);
        }
        
        public async Task<Seller> editSellerActiveStatus(int id)
        {
            return await _sellerRepository.editSellerActiveStatus(id);
        }

        public async Task<string> DeleteSeller(int id)
        {
            return await _sellerRepository.DeleteSeller(id);
        }

        public  Task UpdateSeller(Seller seller)
        {
            
           return  _sellerRepository.UpdateSeller(seller);
        }

        public async Task<Seller> GetSeller(string sellerEmail)
        {
            return await _sellerRepository.GetSeller(sellerEmail);
        }

        public async Task AddProduct(ProductDTO productDTO, string sellerEmail)
        {
            var seller = await _sellerRepository.GetSeller(sellerEmail);
            if (seller != null)
            {
                // Map ProductDTO to Product entity if necessary
                var product = new Product
                {
                    productName = productDTO.productName,
                    imageUrl = productDTO.imageUrl,
                    productDescription = productDTO.productDescription,
                    productCategory = productDTO.productCategory,
                    amount = productDTO.amount,
                    quantity = productDTO.quantity,
                    rating = productDTO.rating,
                };
                product.SellerId = seller.sellerId;
                product.Seller = seller;
                await _sellerRepository.AddProduct(product);
            }
            else
            {
                throw new Exception("Seller not found");
            }

        }

        public async Task<List<Product>> GetAllProducts(string sellerEmail)
        {
            var seller = await _sellerRepository.GetSeller(sellerEmail);
            return await _sellerRepository.GetAllProducts(seller.sellerId);
        }

        public async Task<string> DeleteProduct(int id)
        {
            return await _sellerRepository.DeleteProduct(id);
        }

        public async Task UpdateProduct(ProductDTO productDTO, string sellerEmail)
        {
            var seller = await _sellerRepository.GetSeller(sellerEmail);
            if (seller != null)
            {
                await _sellerRepository.UpdateProduct(productDTO);
            }
           
        }

        public async Task<Product> GetProductById(int id)
        {
           return await _sellerRepository.GetProductById(id);
        }

        public async Task<List<Product>> GetProductByCategory(string _category)
        {
            return await _sellerRepository.GetProductByCategory(_category);
        }
    }
}
