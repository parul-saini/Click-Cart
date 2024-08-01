using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DailyAssignment.Application.IRepository
{
    public interface IUserRepository
    {
        Task AddUser(User _user);

        public Task<List<User>> GetAllUser();

        public Task<User> IsUserLogin(string email, string password);

        public Task<User> GetUserByEmail(string userEmail);

    }
}
