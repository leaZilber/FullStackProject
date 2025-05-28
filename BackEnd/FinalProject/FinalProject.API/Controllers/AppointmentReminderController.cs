//using System;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Mvc;
//using YourApp.Services;

//namespace YourApp.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class AppointmentReminderController : ControllerBase
//    {
//        //private readonly IEmailService _emailService;
        
//        //public AppointmentReminderController(IEmailService emailService)
//        //{
//        //    _emailService = emailService;
//        //}
        
//        [HttpPost("send")]
//        public async Task<IActionResult> SendReminder([FromBody] EmailRequest request)
//        {
//            if (request == null || string.IsNullOrEmpty(request.To))
//            {
//                return BadRequest("Invalid request data");
//            }
            
//            try
//            {
//                bool result = await _emailService.SendEmailAsync(
//                    request.To,
//                    request.Subject,
//                    request.Body
//                );
                
//                if (result)
//                {
//                    return Ok(new { success = true, message = "Email sent successfully" });
//                }
//                else
//                {
//                    return StatusCode(500, new { success = false, message = "Failed to send email" });
//                }
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, new { success = false, message = $"An error occurred: {ex.Message}" });
//            }
//        }
//    }
    
//    public class EmailRequest
//    {
//        public string To { get; set; }
//        public string Subject { get; set; }
//        public string Body { get; set; }
//        public string AppointmentId { get; set; }
//    }
//}
