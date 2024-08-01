using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DailyAssignment.Application.IRepository;
using DailyAssignment.Infrastructure.DataBaseContext;
using Shared.Models;
using Microsoft.EntityFrameworkCore;

namespace DailyAssignment.Infrastructure.Implementations.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly UserDbContext _dbContext;

        public UserRepository(UserDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddUser(User user)
        {
            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<User>> GetAllUser()
        {
            return await _dbContext.Users.ToListAsync();
        }

        public async Task<User> IsUserLogin(string email, string password)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(u => u.email==email && u.password==password);
        }

        public async Task<User> GetUserByEmail(string userEmail)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.email == userEmail);
            return user;
        }

    }
}
