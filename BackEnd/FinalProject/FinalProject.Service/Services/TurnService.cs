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
    public class TurnService : ITurnService
    {
        private readonly ITurnRepository _turnRepository;
        public TurnService(ITurnRepository turnRepository)
        {
            _turnRepository = turnRepository;
        }
        public async Task<List<Turn>> GetAllTurnsAsync()
        {
            return await _turnRepository.GetAllAsync();
        }

        public Turn? GetTurn(int id)
        {
            return _turnRepository.GetById(id);
        }

        public async Task<Turn> AddAsync(Turn turn)
        {
            return await _turnRepository.AddAsync(turn);
        }
        public async Task<Turn> UpDateAsync(Turn turn)
        {
            return await _turnRepository.UpdateAsync(turn);
        }

        public void Delete(int id)
        {
            _turnRepository.Delete(id);
        }

    }
}
