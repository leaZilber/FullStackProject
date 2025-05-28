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
    public class DoctorRepository : IDoctorRepository
    {
        private readonly DataContext _context;
        public DoctorRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<List<Doctor>> GetAllAsync()
        {
            return await _context.doctorList.ToListAsync();
        }

        public Doctor? GetById(int id)
        {
            return _context.doctorList.FirstOrDefault(item => item.DoctorId == id);
        }

        public async Task<Doctor> AddAsync(Doctor newDoctor)
        {
            _context.doctorList.Add(newDoctor);
            await _context.SaveChangesAsync();
            return newDoctor;
        }

        public async Task<Doctor> UpdateAsync(Doctor upDoctor)
        {
            var isExist = GetById(upDoctor.DoctorId);
            if (isExist is null)
            {
                throw new Exception("Doctor not found");
            }
            _context.doctorList.Remove(isExist);
            _context.doctorList.Add(isExist);
            await _context.SaveChangesAsync();
            return isExist;
        }

        public void Delete(int id)
        {
            var isExist = GetById(id);
            if (isExist is not null)
            {
                _context.doctorList.Remove(isExist);
            }
            _context.SaveChanges();
        }
    }
}
