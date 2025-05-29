using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Core.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string UserEncryptedPassword { get; set; }
        public string UserRole { get; set; }
        public string UserPhone { get; set; }
        public string UserAddress { get; set; }
        public DateTime UserBirth { get; set; }
        public DateTime UserCreateDate { get; set; }

        public User(int userId, string userName, string userEmail, string userEncryptedPassword, string userRole, string userPhone, string userAddress, DateTime userBirth, DateTime userCreateDate)
        {
            UserId = userId;
            UserName = userName;
            UserEmail = userEmail;
            UserEncryptedPassword = userEncryptedPassword;
            UserRole = userRole;
            UserPhone = userPhone;
            UserAddress = userAddress;
            UserBirth = userBirth;
            UserCreateDate = userCreateDate;
        }

        public User(string userName, string userEmail, string userEncryptedPassword, string userRole, string userPhone, string userAddress, DateTime userBirth)
        {
            UserName = userName;
            UserEmail = userEmail;
            UserEncryptedPassword = userEncryptedPassword;
            UserRole = userRole;
            UserPhone = userPhone;
            UserAddress = userAddress;
            UserBirth = userBirth;
        }
    }
}