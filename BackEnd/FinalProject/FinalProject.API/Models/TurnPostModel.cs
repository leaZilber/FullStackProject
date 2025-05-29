namespace FinalProject.API.Models
{
    public class TurnPostModel
    {
        public int UserId { get; set; }
        public string DoctorName { get; set; }
        public DateTime DateTurn { get; set; }
        public string TurnLocate { get; set; }
        public string Hour { get; set; }
        public bool ArrivalConfirmation { get; set; }

        public TurnPostModel(int userId, string doctorName, DateTime dateTurn, string turnLocate, string hour, bool arrivalConfirmation)
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
