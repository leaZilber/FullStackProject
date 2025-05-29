using FinalProject.Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Core.DTOs
{
    public class TurnDTO
    {
        public int TurnId { get; set; }
        public int ?UserId { get; set; }
        public string DoctorName { get; set; }
        public DateTime DateTurn { get; set; }
        public string TurnLocate { get; set; }
        public string Hour { get; set; }
        public bool ArrivalConfirmation { get; set; }

        public TurnDTO(int turnId, int? userId, string doctorName, DateTime dateTurn, string turnLocate, string hour, bool arrivalConfirmation)
        {
            TurnId = turnId;
            UserId = userId;
            DoctorName = doctorName;
            DateTurn = dateTurn;
            TurnLocate = turnLocate;
            Hour = hour;
            ArrivalConfirmation = arrivalConfirmation;
        }
    }
}
