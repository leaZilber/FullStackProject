using FinalProject.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Core.IRepositories
{
    public interface IMessageRepository
    {
        Task<List<Message>> GetAllAsync();
        Message? GetById(int id);
        Task<Message> AddAsync(Message newMessage);
        Task<Message> UpdateAsync(Message upMessage);
        void Delete(int id);
    }
}
