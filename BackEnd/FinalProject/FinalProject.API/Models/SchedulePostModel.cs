using FinalProject.Core.Models;

namespace FinalProject.API.Models
{
    public class SchedulePostModel
    {
        //public int ScheduleId { get; set; }
        public int DoctorId { get; set; }
        public List<Turn> Turns { get; set; } = new List<Turn>();

        public SchedulePostModel(int doctorId, List<Turn>turns)
        {
            DoctorId = doctorId;
            Turns = turns;
        }
    }
}
