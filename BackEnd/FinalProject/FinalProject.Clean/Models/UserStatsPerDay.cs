namespace FinalProject.API.Models
{
    public class UserStatsPerDay
    {
        public DateTime Date { get; set; }
        public int NewUsers { get; set; }
        public int TotalUsers { get; set; }

        public UserStatsPerDay(DateTime date, int newUsers, int totalUsers)
        {
            Date = date;
            NewUsers = newUsers;
            TotalUsers = totalUsers;
        }
    }
}
