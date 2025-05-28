using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Core.Models
{
    public class Turn
    {
        [Key]
        public int TurnId { get; set; }
        [ForeignKey("User")]
        public int? UserId { get; set; }
        public string DoctorName { get; set; }
        public DateTime DateTurn { get; set; }
        public string TurnLocate { get; set; }
        public string Hour { get; set; }
        public bool ArrivalConfirmation { get; set; }
    }
}
