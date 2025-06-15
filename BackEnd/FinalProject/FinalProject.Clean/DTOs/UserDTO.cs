using FinalProject.Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Core.DTOs
{
    public class UserDTO
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string UserRole { get; set; }
        public string UserPhone { get; set; }
        public string UserAddress { get; set; }

        public UserDTO(int userId, string userName, string userEmail, string userRole, string userPhone, string userAddress)
        {
            UserId = userId;
            UserName = userName;
            UserEmail = userEmail;
            UserRole = userRole;
            UserPhone = userPhone;
            UserAddress = userAddress;
        }
    }
}
