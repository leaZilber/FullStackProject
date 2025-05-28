using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Core.Models
{
    public class Message
    {
        [Key]
        public int MessageId { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }
        public int SenderId { get; set; }
        public string MessageContent { get; set; }
        public DateTime MessageDate { get; set; }

    }
}
