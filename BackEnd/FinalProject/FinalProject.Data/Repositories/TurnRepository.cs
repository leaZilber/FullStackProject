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
    public class TurnRepository : ITurnRepository
    {
        private readonly DataContext _context;
        public TurnRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<List<Turn>> GetAllAsync()
        {
            return await _context.turnList.ToListAsync();
        }

        public Turn? GetById(int id)
        {
            return _context.turnList.FirstOrDefault(item => item.TurnId == id);
        }

        public async Task<Turn> AddAsync(Turn newTurn)
        {
            _context.turnList.Add(newTurn);
            await _context.SaveChangesAsync();
            return newTurn;
        }

        public async Task<Turn> UpdateAsync(Turn upTurn)
        {
            var isExist = GetById(upTurn.TurnId);
            if (isExist is null)
            {
                throw new Exception("Turn not found");
            }
            _context.turnList.Remove(isExist);
            _context.turnList.Add(isExist);
            await _context.SaveChangesAsync();
            return isExist;
        }

        public void Delete(int id)
        {
            var isExist = GetById(id);
            if (isExist is not null)
            {
                _context.turnList.Remove(isExist);
            }
            _context.SaveChanges();
        }
    }
}