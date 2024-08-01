using DailyAssignment.Application.IRepository;
using DailyAssignment.Infrastructure.DataBaseContext;
using Microsoft.EntityFrameworkCore;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DailyAssignment.Infrastructure.Implementations.Repository
{
    public class AdminRepository :IAdminRepository
    {
        private readonly UserDbContext _userDbContext;

        public AdminRepository(UserDbContext userDbContext)
        {
            _userDbContext = userDbContext;
        }

        public async Task AddAdmin(Admin _user)
        {
            await _userDbContext.Admins.AddAsync(_user);
            await _userDbContext.SaveChangesAsync();
        }

        public async Task<List<Admin>> GetAllAdmins()
        {
            return await _userDbContext.Admins.ToListAsync();
        }

        public async Task<Admin> IsAdminLogin(string email, string password)
        {
            return await _userDbContext.Admins.FirstOrDefaultAsync(u => u.email==email && u.password==password);
        }
    }
}
