namespace FinalProject.API.Models
{
    public class LoginModel
    {
        public string UserName { get; set; }
        public string UserEncryptedPassword { get; set; }
        public LoginModel(string userName, string userEncryptedPassword)
        {
            UserName = userName;
            UserEncryptedPassword = userEncryptedPassword;
        }
    }
}
