using FinalProject.API.Models;
using FinalProject.Core.IRepositories;
using FinalProject.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Core.IServices
{
    public interface IUserService
    {
        Task<List<User>> GetAllUsersAsync();
        User? GetUser(int id);
        Task<User> AddAsync(User user);
        Task<User> UpDateAsync(User user);
        void Delete(int id);
        Task<List<UserStatsPerDay>> GetUserStatsOverTime();

    }
}
