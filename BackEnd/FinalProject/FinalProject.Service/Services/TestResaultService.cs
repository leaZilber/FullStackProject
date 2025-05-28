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
    public class TestResaultService : ITestResualtService
    {
        private readonly ITestResualtRepository _testResaultRepository;
        public TestResaultService(ITestResualtRepository testResaultRepository)
        {
            _testResaultRepository = testResaultRepository;
        }
        public async Task<List<TestResualt>> GetAllTestResualtAsync()
        {
            return await _testResaultRepository.GetAllAsync();
        }

        public TestResualt? GetTestResualt(int id)
        {
            return _testResaultRepository.GetById(id);
        }

        public async Task<TestResualt> AddAsync(TestResualt test)
        {
            return await _testResaultRepository.AddAsync(test);
        }
        public async Task<TestResualt> UpDateAsync(TestResualt test)
        {
            return await _testResaultRepository.UpdateAsync(test);
        }

        public void Delete(int id)
        {
            _testResaultRepository.Delete(id);
        }
    }
}