using DailyAssignment.Application.IRepository;
using DailyAssignment.Infrastructure.DataBaseContext;
using Microsoft.EntityFrameworkCore;
using Shared.DTO;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DailyAssignment.Infrastructure.Implementations.Repository
{
    public class SellerRepository : ISellerRepository
    {
        private readonly UserDbContext _sellerDbContext;
        public SellerRepository(UserDbContext sellerDbContext) {
            _sellerDbContext = sellerDbContext;
        }

        public async Task AddNewSeller(Seller _user)
        {
            await _sellerDbContext.Sellers.AddAsync(_user);
            await _sellerDbContext.SaveChangesAsync();
        }
        public async Task<List<Seller>> GetAllSellers()
        {
           return await _sellerDbContext.Sellers.ToListAsync();
        }

        public async Task<Seller> IsSellerLogin(string email, string password)
        {
            return await _sellerDbContext.Sellers.FirstOrDefaultAsync(u => (u.email==email && u.password==password));
        }
        
        public async Task<Seller> editSellerActiveStatus(int id)
        {
             var seller= await _sellerDbContext.Sellers.FirstOrDefaultAsync(u => (u.sellerId == id));
            if(seller != null)
            {
                seller.ActiveStatus = !seller.ActiveStatus;
                await _sellerDbContext.SaveChangesAsync();
            }
            return seller;
        }

        public async Task<string> DeleteSeller(int id)
        {
            var seller = await _sellerDbContext.Sellers.FindAsync(id);
            if (seller == null)
            {
                throw new Exception("Seller not found."); //  if seller is not found
            }

            _sellerDbContext.Sellers.Remove(seller);
            await _sellerDbContext.SaveChangesAsync();

            return "SELLER DELETED SUCCESSFULLY";
        }


        public async Task UpdateSeller(Seller seller)
        {
            //var existingseller = await _sellerDbContext.Sellers.FirstOrDefaultAsync(u => u.sellerId==seller.sellerId);
            //if (existingseller != null) { 
            //    existingseller.firstName= seller.firstName;
            //    existingseller.lastName= seller.lastName;
            //    existingseller.phone= seller.phone;
            //    existingseller.email= seller.email;
            //    existingseller.address= seller.address;
            //    existingseller.age= seller.age;
            //    existingseller.gender= seller.gender;

            //    await   _sellerDbContext.SaveChangesAsync();
            //}

            //return existingseller;
            _sellerDbContext.Sellers.Update(seller);
            await _sellerDbContext.SaveChangesAsync();
        }

        public async Task<Seller> GetSeller(string sellerEmail)
        {
            var seller = await _sellerDbContext.Sellers.FirstOrDefaultAsync(u => u.email == sellerEmail);
            return seller;
        }


        //-------------------------Products related functions----------------
        public async Task AddProduct(Product _product)
        {
            await _sellerDbContext.Products.AddAsync(_product);
            await _sellerDbContext.SaveChangesAsync();
        }

        public async Task<List<Product>> GetAllProducts(int id)
        {
           return await _sellerDbContext.Products.Where(u=>u.SellerId==id).ToListAsync();
        }

        public async Task<string> DeleteProduct(int id)
        {
            var _product = await _sellerDbContext.Products.FirstOrDefaultAsync(u => u.PId == id);
            if(_product == null)
            {
                return "Product Not Found";
            }
              _sellerDbContext.Products.Remove(_product);
            await _sellerDbContext.SaveChangesAsync();

            return "Product Deleted Successfully";
        }

        public async Task UpdateProduct(ProductDTO _product)
        {
            var productToUpdate= await _sellerDbContext.Products.FirstOrDefaultAsync(u => u.PId == _product.PId);
            if(productToUpdate != null)
            { 
                    productToUpdate.productName= _product.productName;
                    productToUpdate.productDescription= _product.productDescription;
                    productToUpdate.quantity= _product.quantity;
                    productToUpdate.amount= _product.amount;
                    productToUpdate.imageUrl= _product.imageUrl;
                    productToUpdate.productCategory= _product.productCategory;
                    productToUpdate.rating= _product.rating;

                _sellerDbContext.Products.Update(productToUpdate);
                await _sellerDbContext.SaveChangesAsync();
            }
        }

        public async Task<Product> GetProductById(int id)
        {
            return await _sellerDbContext.Products.FirstOrDefaultAsync(u=> u.PId== id);
        }
        
        public async Task<List<Product>> GetProductByCategory(string _category)
        {
            return await _sellerDbContext.Products.Where(u => u.productCategory == _category).ToListAsync();
        }
    }
}
