//using System;
//using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations.Schema;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace FinalProject.Core.Models
//{
//    public class Schedule
//    {
//        [Key]
//        public int ScheduleId { get; set; }
//        [ForeignKey("Doctor")]
//        public int DoctorId { get; set; } // גם המפתח הראשי וגם FK
//        public Doctor Doctor { get; set; } // ניווט לדוקטור
//        public List<Turn> Turns { get; set; } = new List<Turn>();
//    }
//}
