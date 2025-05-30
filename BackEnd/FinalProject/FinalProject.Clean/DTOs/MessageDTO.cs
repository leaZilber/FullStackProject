﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Core.DTOs
{
    public class MessageDTO
    {
        public int MessageId { get; set; }
        public int SenderId { get; set; }
        public string MessageContent { get; set; }
        public DateTime MessageDate { get; set; }

        public MessageDTO(int messageId, int senderId, string messageContent, DateTime messageDate)
        {
            MessageId = messageId;
            SenderId = senderId;
            MessageContent = messageContent;
            MessageDate = messageDate;
        }
    }
}
