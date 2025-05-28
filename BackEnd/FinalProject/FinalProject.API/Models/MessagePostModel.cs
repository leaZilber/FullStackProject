namespace FinalProject.API.Models
{
    public class MessagePostModel
    {

        public int UserId { get; set; }
        public int SenderId { get; set; }
        public string MessageContent { get; set; }
        public DateOnly MessageDate { get; set; }
    }
}
