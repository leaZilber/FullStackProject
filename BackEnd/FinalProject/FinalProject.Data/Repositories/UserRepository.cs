using FinalProject.API.Models;
using FinalProject.Core.IRepositories;
using FinalProject.Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<List<User>> GetAllAsync()
        {
            return await _context.userList.ToListAsync();
        }

        public User? GetById(int id)
        {
            return _context.userList.FirstOrDefault(item => item.UserId == id);
        }

        public async Task<User> AddAsync(User newUser)
        {
            _context.userList.Add(newUser);
            await _context.SaveChangesAsync();
            return newUser;
        }

        public async Task<User> UpdateAsync(User upUser)
        {
            var isExist = GetById(upUser.UserId);
            if (isExist is null)
            {
                throw new Exception("User not found");
            }
            _context.userList.Remove(isExist);
            _context.userList.Add(isExist);
            await _context.SaveChangesAsync();
            return isExist;
        }

        public void Delete(int id)
        {
            var isExist = GetById(id);
            if (isExist is not null)
            {
                _context.userList.Remove(isExist);
            }
            _context.SaveChanges();
        }


        public async Task<int> CountNewUsersOnDate(DateTime date)
        {
            return await _context.userList
                .CountAsync(u => u.UserCreateDate.Date == date.Date);
        }

        public async Task<int> CountTotalUsersUntilDate(DateTime date)
        {
            return await _context.userList
                .CountAsync(u => u.UserCreateDate.Date <= date.Date);
        }
    }
}