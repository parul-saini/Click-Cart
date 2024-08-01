using Shared.DTO;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DailyAssignment.Application.IServices
{
    public interface ISellerService
    {
        public Task AddNewSeller(Seller _user);

        public Task<List<Seller>> GetAllSellers();

        public Task<Seller> GetSeller(string sellerEmail);

        public Task<Seller> IsSellerLogin(string email, string password);

        public Task<Seller> editSellerActiveStatus(int id);

        public Task<string> DeleteSeller(int id);

        public Task UpdateSeller(Seller seller);

        public Task AddProduct(ProductDTO productDTO, string sellerEmail);

        public Task<List<Product>> GetAllProducts(string sellerEmail);

        public Task UpdateProduct(ProductDTO productDTO, string sellerEmail);

        public Task<string> DeleteProduct(int id);

        public Task<Product> GetProductById(int id);

        public Task<List<Product>> GetProductByCategory(string _category);
    }
}
