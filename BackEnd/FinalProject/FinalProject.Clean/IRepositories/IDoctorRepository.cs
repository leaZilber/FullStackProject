using FinalProject.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Core.IRepositories
{
    public interface IDoctorRepository
    {
        Task<List<Doctor>> GetAllAsync();
        Doctor? GetById(int id);
        Task<Doctor> AddAsync(Doctor newDoctor);
        Task<Doctor> UpdateAsync(Doctor upDoctor);
        void Delete(int id);
    }
}
