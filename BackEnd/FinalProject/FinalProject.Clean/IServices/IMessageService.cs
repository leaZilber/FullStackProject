using FinalProject.Core.IRepositories;
using FinalProject.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace FinalProject.Core.IServices
{
    public interface IMessageService
    {
        Task<List<Message>> GetAllMessagesAsync();
        Message? GetMessage(int id);
        Task<Message> AddAsync(Message mes);
        Task<Message> UpDateAsync(Message mes);
        void Delete(int id);
    }
}
