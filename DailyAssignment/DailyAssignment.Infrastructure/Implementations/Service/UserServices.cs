using DailyAssignment.Application.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;
using DailyAssignment.Application.IServices;

namespace DailyAssignment.Infrastructure.Implementations.Service
{
    public class UserServices : IUserServices
    {
        private readonly IUserRepository _userRepository;
        public UserServices(IUserRepository userRepository) { 
           _userRepository = userRepository;
        }

        public Task AddUser(User user)
        {
           return _userRepository.AddUser(user);
        }
        public Task<List<User>> GetAllUser() {
          return  _userRepository.GetAllUser();
        }
        public Task<User> IsUserLogin(string email, string password){
          return  _userRepository.IsUserLogin(email,password);
        }
    }
}
