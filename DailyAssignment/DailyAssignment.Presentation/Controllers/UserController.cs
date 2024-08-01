using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DailyAssignment.Application.IServices;
using Shared.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Shared.DTO;
using Microsoft.AspNetCore.Identity.Data;
using DailyAssignment.Infrastructure.Implementations.Service;
using DailyAssignment.Presentation;
using Microsoft.AspNetCore.Authorization;

namespace DailyAssignment.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserServices _userServices;
        private readonly ISellerService _sellerService;
        private readonly IAdminService _adminService;
        private readonly IProductServices _productServices;

        private readonly string _secretKey = "My_Updated_Secret_Key_Here_parul";

        public UserController(IUserServices userServices, ISellerService sellerService,
            IAdminService adminService, IProductServices productServices)
        {
            _userServices = userServices;
            _sellerService = sellerService;
            _adminService= adminService;
            _productServices = productServices;
        }

        // ---------------------------------customer requests

        [HttpGet]
        [Route("/getalluser")]
        public Task<List<User>> GetUsers() {
          return  _userServices.GetAllUser();
        }
        
        [HttpPost]
        [Route("/adduser")]
        public async Task<IActionResult> AddUsers(User _user) {
            //Console.WriteLine(_user);
            if (_user == null)
            {
                return BadRequest("User is null");
            }

            try
            {
                await _userServices.AddUser(_user);
                return Ok(_user);
            }
            catch (DbUpdateException ex) when (ex.InnerException is SqlException sqlEx && sqlEx.Number == 2601)
            {
                // Unique constraint violation
                return BadRequest(new { message = "A user with this email already exists." , StatusCode= 404 });
            }
            catch (Exception ex)
            {
                // General error handling
                return BadRequest(new { message = "Internal server error", StatusCode = 500 });
            }
        }
        
        [HttpPost]
        [Route("/loginUser")]
        public async Task<IActionResult> IsLogin(UserLogin loginRequest) {
            var user = await _userServices.IsUserLogin(loginRequest.email, loginRequest.password);
            if (user == null)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            //  generate a token 
            var token = JwtTokenGenerator.GenerateToken(user.email, _secretKey);
            return Ok(new { Token = token });
        }


        //------------------------------------seller requests

        [HttpPost]
        [Route("/addSeller")]
        public async Task<IActionResult> AddSeller(Seller _user)
        {
            //Console.WriteLine(_user);
            if (_user == null)
            {
                return BadRequest("User is null");
            }

            try
            {
                await _sellerService.AddNewSeller(_user);
                return Ok(_user);
            }
            catch (DbUpdateException ex) when (ex.InnerException is SqlException sqlEx && sqlEx.Number == 2601)
            {
                // Unique constraint violation
                return BadRequest(new { message = "A user with this email already exists.", StatusCode = 404 });
            }
            catch (Exception ex)
            {
                // General error handling
                return BadRequest(new { message = "Internal server error", StatusCode = 500 });
            }
        }


        [HttpGet]
        [Route("/getallSeller")]
        public Task<List<Seller>> GetSellers()
        {
            return _sellerService.GetAllSellers();
        }

        [HttpPost]
        [Route("/loginSeller")]
        public async Task<IActionResult> IsLoginSeller(sellerLogin loginRequest)
        {
            var user = await _sellerService.IsSellerLogin(loginRequest.email, loginRequest.password);
            if (user == null)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            //  generate a token 
            var token = JwtTokenGenerator.GenerateToken(user.email, _secretKey);
            return Ok(new { Token = token , UserId =  user.sellerId});
        }
        
        [HttpGet]
        [Route("/editStatus/{id}")]
        public async Task<IActionResult> editActiveStatus(int id)
        {
            var user = await _sellerService.editSellerActiveStatus(id);
            if (user == null)
            {
                return BadRequest(new { message = "Invalid Seller" });
            }

            // You can generate a token or session here if needed
            return Ok(user);
        }
        
        [HttpDelete]
        [Route("/deleteSeler/{id}")]
        public async Task<IActionResult> DeleteSellerById(int id)
        {
            try
            {
                var msg= await _sellerService.DeleteSeller(id);
                return Ok(new { message = msg });

            }
            catch (Exception ex) {
                return BadRequest(new { message = "Failed To delete the seller Try later" });
            }
        }

        [HttpPatch]
        [Route("/updateSeller")]
        public async Task<IActionResult> UpdateSellerDetails(Seller updatedSeller)
        {
            var userEmail = User.Identity.Name; // Retrieve email from token
            var seller = await _sellerService.GetSeller(userEmail);
            if (seller == null)
            {
                return NotFound(new { message = "Seller not found" });
            }

            // Update the seller details
            seller.firstName = updatedSeller.firstName;
            seller.lastName = updatedSeller.lastName;
            seller.address = updatedSeller.address;
            seller.age=updatedSeller.age;
            seller.gender = updatedSeller.gender;
            seller.phone = updatedSeller.phone;
            seller.email = updatedSeller.email;

            try
            {
                await _sellerService.UpdateSeller(seller);
                return Ok(seller);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        [HttpGet]
        [Route("/getSeller")]
        public async Task<IActionResult> getselllerdata()
        {
            var userEmail = User.Identity.Name;
            if(userEmail == null)
            {
                return BadRequest(new { message = "Invalid Token" });
            }
            var seller = await _sellerService.GetSeller(userEmail);
            if(seller == null)
            {
                return BadRequest(new { message="seller Not found " });
            }
            return Ok(seller);
        }


        //-------------------------------------Products realted requests-------------------

        [HttpPost]
        [Route("/addproduct")]
        public async Task<IActionResult> Addproduct(ProductDTO productDTO)
        {
            if(productDTO == null)
            {
                return BadRequest("Prouduct is Null");
            }

            try
            {
                var userEmail = User.Identity.Name;
                if (userEmail == null)
                {
                    return BadRequest(new { message = "Invalid Token" });
                }

                await _sellerService.AddProduct(productDTO, userEmail);

                return Ok(productDTO);
            }
            catch (Exception ex) {
                return BadRequest(new { message = "Internal server error", StatusCode = 500 });
            }
        }


        [HttpGet]
        [Route("/getAllProduct")]
        public async Task<IActionResult>getAllProducts()
        {
            try
            {
                var userEmail = User.Identity.Name;
                if (userEmail == null)
                {
                    return BadRequest(new { message = "Invalid Token" });
                }
                var products = await _sellerService.GetAllProducts(userEmail);
                return Ok(products);
            }
            catch (Exception ex) {
                return BadRequest(new { message = "Internal server error", StatusCode = 500 });
            }
        }

        [HttpPatch]
        [Route("/updateProduct")]
        public async Task<IActionResult> updateProduct(ProductDTO _productDTO) {
            if (_productDTO == null)
            {
                return BadRequest(new { message = "Product is not found" });
            }

            try
            {
                var sellerEmail = User.Identity.Name;
                if (sellerEmail == null)
                {
                    return BadRequest(new { message = "Invalid Token" });
                }
                await _sellerService.UpdateProduct(_productDTO,sellerEmail);
                  return Ok(_productDTO);
            }
            catch (Exception ex) {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        [HttpDelete]
        [Route("/DeletedProductById/{id}")]
        public async Task<IActionResult> DeletedProduct(int id)
        {
            if (id == null)
            {
                return BadRequest(new { message = "Id is NULL" });
            }

            try
            {
                var msg = await _sellerService.DeleteProduct(id);
                return Ok(new { message = msg });

            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Failed To delete the Product Try later" });
            }


        }

        [HttpGet]
        [Route("/getProductById/{id}")]
        public async Task<IActionResult> getProductById(int id)
        {
            if (id == null)
            {
                return BadRequest(new { message = "Id is null" });
            }

            try
            {
                var prod = await _sellerService.GetProductById(id);
                return Ok(prod);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Internal server error", StatusCode = 500 });
            }
        }


        [HttpGet]
        [Route("/getProductByCategory/{_category}")]
        public async Task<IActionResult> getProductByCategories(string _category)
        {
            if(_category == null)
            {
                return BadRequest(new { message = "Category is null" });
            }
            try
            {
                var products=  await _sellerService.GetProductByCategory(_category);
                return Ok(products);

            }
            catch(Exception ex)
            {
                return BadRequest(new { message = "Server error" });
            }
        }
        //------------------------------admin requests-----------------------------

        [HttpPost]
        [Route("/addAdmin")]
        public async Task<IActionResult> AddAdmin(Admin _user)
        {
            //Console.WriteLine(_user);
            if (_user == null)
            {
                return BadRequest("User is null");
            }

            try
            {
                await _adminService.AddAdmin(_user);
                return Ok(_user);
            }
            catch (DbUpdateException ex) when (ex.InnerException is SqlException sqlEx && sqlEx.Number == 2601)
            {
                // Unique constraint violation
                return BadRequest(new { message = "A user with this email already exists.", StatusCode = 404 });
            }
            catch (Exception ex)
            {
                // General error handling
                return BadRequest(new { message = "Internal server error", StatusCode = 500 });
            }
        }


        [HttpGet]
        [Route("/getallAdmins")]
        public Task<List<Admin>> GetAllAdmins()
        {
            return _adminService.GetAllAdmins();
        }

        [HttpPost]
        [Route("/loginAdmin")]
        public async Task<IActionResult> IsLoginAdmin(AdminLogin loginRequest)
        {
            var user = await _adminService.IsAdminLogin(loginRequest.email, loginRequest.password);
            if (user == null)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            //  generate a token 
            var token = JwtTokenGenerator.GenerateToken(user.email, _secretKey);
            return Ok(new { Token = token, User = user });
        }


        //------------------------------------ cart related requests------------

        [HttpPost]
        [Route("/addToCart")]
        public async Task<IActionResult> AddToCart(AddToCartRequest addToCartItem)
        {
            if (addToCartItem == null) {
                return BadRequest(new { message = "CartItem is null" });
            }
            try
            {
                var userEmail = User.Identity.Name;
                if (userEmail == null)
                {
                    return BadRequest(new { message = "Invalid Token" });
                }

                await  _productServices.AddToCart(addToCartItem,userEmail);

                return Ok(new { message = "Product added to cart" });
            }
            catch (Exception ex) {
                return BadRequest(new { message = "Internal Server error , failed to add in cart" });
            }
        }

        [HttpGet]
        [Route("/getAllCartItems")]
        public async Task<IActionResult> GetCartItems()
        {
            try
            {
                var userEmail = User.Identity.Name;
                if (userEmail == null)
                {
                    return BadRequest(new { message = "Invalid Token" });
                }

                var cartItems= await _productServices.GetCartItems(userEmail);

                return Ok(cartItems);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Internal Server error , Failed to get cart items" });
            }
        }

        [HttpDelete]
        [Route("/DeleteCartItem/{productId}")]
        public async Task<IActionResult> RemoveFromCart(int productId)
        {
            if (productId == 0)
            {
                return BadRequest(new { message = "product id can not be null" });
            }

            try
            {
                var userEmail = User.Identity.Name;
                if (userEmail == null)
                {
                    return BadRequest(new { message = "Invalid Token" });
                }

                await _productServices.RemoveFromCart(userEmail, productId);
                return Ok(new { message = "Product removed from cart" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Internal Server Error", StatusCode = 500, error = ex.Message });
            }

        }

        [HttpDelete]
        [Route("/clearCart")]
        public async Task<IActionResult> ClearCart()
        {
            try
            {
                var userEmail = User.Identity.Name;
                if (userEmail == null)
                {
                    return BadRequest(new { message = "Invalid Token" });
                }

                await _productServices.ClearCart(userEmail);
                return Ok(new { message = "Cart cleared successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Internal Server Error", StatusCode = 500, error = ex.Message });
            }
        }


    }
}
