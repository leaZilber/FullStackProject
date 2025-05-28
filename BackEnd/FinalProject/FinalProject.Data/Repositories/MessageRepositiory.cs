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
    public class MessageRepositiory : IMessageRepository
    {
        private readonly DataContext _context;
        public MessageRepositiory(DataContext context)
        {
            _context = context;
        }
        public async Task<List<Message>> GetAllAsync()
        {
            return await _context.messagesList.ToListAsync();
        }

        public Message? GetById(int id)
        {
            return _context.messagesList.FirstOrDefault(item => item.UserId == id);
        }

        public async Task<Message> AddAsync(Message newMessage)
        {
            _context.messagesList.Add(newMessage);
            await _context.SaveChangesAsync();
            return newMessage;
        }

        public async Task<Message> UpdateAsync(Message upMessage)
        {
            var isExist = GetById(upMessage.MessageId);
            if (isExist is null)
            {
                throw new Exception("Message not found");
            }
            _context.messagesList.Remove(isExist);
            _context.messagesList.Add(isExist);
            await _context.SaveChangesAsync();
            return isExist;
        }

        public void Delete(int id)
        {
            var isExist = GetById(id);
            if (isExist is not null)
            {
                _context.messagesList.Remove(isExist);
            }
            _context.SaveChanges();
        }
    }
}
