using FinalProject.Core.Models;

namespace FinalProject.API.Models
{
    public class UserPostModel
    {
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string UserEncryptedPassword { get; set; }
        public string UserRole { get; set; }
        public string UserPhone { get; set; }
        public string UserAddress { get; set; }
        public DateTime UserBirth { get; set; }
    }
}