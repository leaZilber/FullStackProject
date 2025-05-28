using FinalProject.Core.IRepositories;
using FinalProject.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Core.IServices
{
    public interface ITurnService
    {
        Task<List<Turn>> GetAllTurnsAsync();
        Turn? GetTurn(int id);
        Task<Turn> AddAsync(Turn turn);
        Task<Turn> UpDateAsync(Turn turn);
        void Delete(int id);
    }
}
