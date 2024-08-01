using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DailyAssignment.Application.IRepository
{
    public interface IAdminRepository
    {
        Task AddAdmin(Admin _user);

        public Task<List<Admin>> GetAllAdmins();

        public Task<Admin> IsAdminLogin(string email, string password);
    }
}
