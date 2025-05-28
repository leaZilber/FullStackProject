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
    public class MessageService : IMessageService
    {
        private readonly IMessageRepository _messageRepository;
        public MessageService(IMessageRepository messageRepository)
        {
            _messageRepository = messageRepository;
        }
        public async Task<List<Message>> GetAllMessagesAsync()
        {
            return await _messageRepository.GetAllAsync();
        }

        public Message? GetMessage(int id)
        {
            return _messageRepository.GetById(id);
        }

        public async Task<Message> AddAsync(Message mes)
        {
            return await _messageRepository.AddAsync(mes);
        }

        public async Task<Message> UpDateAsync(Message mes)
        {
            return await _messageRepository.UpdateAsync(mes);
        }

        public void Delete(int id)
        {
            _messageRepository.Delete(id);
        }
    }
}
