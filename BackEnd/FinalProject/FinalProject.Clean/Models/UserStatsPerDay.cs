namespace FinalProject.API.Models
{
    public class UserStatsPerDay
    {
        public DateTime Date { get; set; }
        public int NewUsers { get; set; }
        public int TotalUsers { get; set; }
    }
}
