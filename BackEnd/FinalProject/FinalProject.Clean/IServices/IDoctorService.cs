using FinalProject.Core.IRepositories;
using FinalProject.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Core.IServices
{
    public interface IDoctorService
    {
        Task<List<Doctor>> GetAllDoctorsAsync();
        Doctor? GetDoctor(int id);
        Task<Doctor> AddAsync(Doctor doctor);
        Task<Doctor> UpDateAsync(Doctor doctor);
        void Delete(int id);
    }
}
