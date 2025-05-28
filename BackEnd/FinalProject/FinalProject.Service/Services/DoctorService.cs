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
    public class DoctorService : IDoctorService
    {
        private readonly IDoctorRepository _doctorRepository;
        public DoctorService(IDoctorRepository doctorRepository)
        {
            _doctorRepository = doctorRepository;
        }
        public async Task<List<Doctor>> GetAllDoctorsAsync()
        {
            return await _doctorRepository.GetAllAsync();
        }

        public Doctor? GetDoctor(int id)
        {
            return _doctorRepository.GetById(id);
        }

        public async Task<Doctor> AddAsync(Doctor doctor)
        {
            return await _doctorRepository.AddAsync(doctor);
        }
        public async Task<Doctor> UpDateAsync(Doctor doctor)
        {
            return await _doctorRepository.UpdateAsync(doctor);
        }

        public void Delete(int id)
        {
            _doctorRepository.Delete(id);
        }
    }
}
