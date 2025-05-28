using FinalProject.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Core.IRepositories
{
    public interface ITurnRepository
    {
        Task<List<Turn>> GetAllAsync();
        Turn? GetById(int id);
        Task<Turn> AddAsync(Turn newTurn);
        Task<Turn> UpdateAsync(Turn upTurn);
        void Delete(int id);
    }
}
