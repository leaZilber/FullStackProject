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
    public class TestResaltRepository : ITestResualtRepository
    {
        private readonly DataContext _context;
        public TestResaltRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<List<TestResualt>> GetAllAsync()
        {
            return await _context.testResaultList.ToListAsync();
        }

        public TestResualt? GetById(int id)
        {
            return _context.testResaultList.FirstOrDefault(item => item.UserId == id);
        }

        public async Task<TestResualt> AddAsync(TestResualt newTestResault)
        {
            _context.testResaultList.Add(newTestResault);
            await _context.SaveChangesAsync();
            return newTestResault;
        }

        public async Task<TestResualt> UpdateAsync(TestResualt upTestResault)
        {
            var isExist = GetById(upTestResault.TestId);
            if (isExist is null)
            {
                throw new Exception("Test Resault not found");
            }
            _context.testResaultList.Remove(isExist);
            _context.testResaultList.Add(isExist);
            await _context.SaveChangesAsync();
            return isExist;
        }

        public void Delete(int id)
        {
            var isExist = GetById(id);
            if (isExist is not null)
            {
                _context.testResaultList.Remove(isExist);
            }
            _context.SaveChanges();
        }
    }
}