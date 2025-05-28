using FinalProject.API.Models;
using FinalProject.Core.IRepositories;
using FinalProject.Core.IServices;
using FinalProject.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Service.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _userRepository.GetAllAsync();
        }

        public User? GetUser(int id)
        {
            return _userRepository.GetById(id);
        }

        public async Task<User> AddAsync(User user)
        {
            return await _userRepository.AddAsync(user);
        }
        public async Task<User> UpDateAsync(User user)
        {
            return await _userRepository.UpdateAsync(user);
        }

        public void Delete(int id)
        {
            _userRepository.Delete(id);
        }

       public async Task<List<UserStatsPerDay>> GetUserStatsOverTime()
        {
            var startDate = DateTime.Today.AddDays(-30);
            var endDate = DateTime.Today;

            var result = new List<UserStatsPerDay>();

            for (var date = startDate; date <= endDate; date = date.AddDays(1))
            {
                var newUsers = await _userRepository.CountNewUsersOnDate(date);
                var totalUsers = await _userRepository.CountTotalUsersUntilDate(date);

                result.Add(new UserStatsPerDay
                {
                    Date = date,
                    NewUsers = newUsers,
                    TotalUsers = totalUsers
                });
            }

            return result;
        }
    }
}
