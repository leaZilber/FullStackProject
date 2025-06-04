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
        [MaxLength(50)]
        public string DoctorName { get; set; }
        public DateTime DateTurn { get; set; }
        [MaxLength(100)]
        public string TurnLocate { get; set; }
        [MaxLength(10)]
        public string Hour { get; set; }
        public bool ArrivalConfirmation { get; set; }

        public Turn(int turnId, int? userId, string doctorName, DateTime dateTurn, string turnLocate, string hour, bool arrivalConfirmation)
        {
            TurnId = turnId;
            UserId = userId;
            DoctorName = doctorName;
            DateTurn = dateTurn;
            TurnLocate = turnLocate;
            Hour = hour;
            ArrivalConfirmation = arrivalConfirmation;
        }

        public Turn(int? userId, string doctorName, DateTime dateTurn, string turnLocate, string hour, bool arrivalConfirmation)
        {
            UserId = userId;
            DoctorName = doctorName;
            DateTurn = dateTurn;
            TurnLocate = turnLocate;
            Hour = hour;
            ArrivalConfirmation = arrivalConfirmation;
        }
    }
}
