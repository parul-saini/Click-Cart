using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DailyAssignment.Application.IServices
{
    public interface IUserServices
    {
        Task AddUser(User _user);
        public Task<List<User>> GetAllUser();

        public Task<User> IsUserLogin(string email, string password);

    }
}
