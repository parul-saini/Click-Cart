using Shared.DTO;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DailyAssignment.Application.IRepository
{
    public interface ISellerRepository
    {
        public Task AddNewSeller(Seller _user);

        public Task<List<Seller>> GetAllSellers();
        public Task<Seller> GetSeller(string sellerEmail);

        public Task<Seller> IsSellerLogin(string email, string password);

        public Task<Seller> editSellerActiveStatus(int id);

        public Task<string> DeleteSeller(int id);

        public Task UpdateSeller(Seller seller);


        //------------------Products related functions------------------
        public Task AddProduct(Product _product);

        public Task<List<Product>> GetAllProducts(int id);

        public Task UpdateProduct(ProductDTO _product);

        public Task<string> DeleteProduct(int id);

        public Task<Product> GetProductById(int id);

        public Task<List<Product>> GetProductByCategory(string _category);
    }
}
