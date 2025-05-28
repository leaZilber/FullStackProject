using FinalProject.API.Models;
using FinalProject.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Core.IRepositories
{
    public interface IUserRepository
    {
        Task<List<User>> GetAllAsync();
        User GetById(int id);
        Task<User> AddAsync(User newUser);
        Task<User> UpdateAsync(User upUser);
        void Delete(int id);
        Task<int> CountNewUsersOnDate(DateTime date);
        Task<int> CountTotalUsersUntilDate(DateTime date);

    }
}
