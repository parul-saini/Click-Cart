using DailyAssignment.Application.IRepository;
using DailyAssignment.Application.IServices;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DailyAssignment.Infrastructure.Implementations.Service
{
    public class AdminService : IAdminService
    {
        private readonly IAdminRepository _adminRepository;
        public AdminService(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }

        public Task AddAdmin(Admin _user)
        {
            return _adminRepository.AddAdmin(_user);
        }

        public Task<List<Admin>> GetAllAdmins()
        {
            return _adminRepository.GetAllAdmins();
        }

        public Task<Admin> IsAdminLogin(string email, string password)
        {
            return _adminRepository.IsAdminLogin(email, password);
        }
    }
}
