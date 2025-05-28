using FinalProject.Core.IRepositories;
using FinalProject.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Core.IServices
{
    public interface ITestResualtService
    {
        Task<List<TestResualt>> GetAllTestResualtAsync();
        TestResualt? GetTestResualt(int id);
        Task<TestResualt> AddAsync(TestResualt test);
        Task<TestResualt> UpDateAsync(TestResualt test);
        void Delete(int id);
    }
}