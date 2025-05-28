using FinalProject.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Core.IRepositories
{
    public interface ITestResualtRepository
    {
        Task<List<TestResualt>> GetAllAsync();
        TestResualt? GetById(int id);
        Task<TestResualt> AddAsync(TestResualt newTestResault);
        Task<TestResualt> UpdateAsync(TestResualt upTestResault);
        void Delete(int id);
    }
}