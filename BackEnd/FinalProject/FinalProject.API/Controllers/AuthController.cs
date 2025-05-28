//using FinalProject.API.Models;
//using FinalProject.Data;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.IdentityModel.Tokens;
//using System;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;
//using System.Text.Json;

//namespace FinalProject.API.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class AuthController : ControllerBase
//    {
//        private readonly IConfiguration _configuration;
//        private readonly DataContext _context;

//        public AuthController(IConfiguration configuration, DataContext context)
//        {
//            _configuration = configuration;
//            _context = context;
//        }


//        //[HttpPost]
//        //[HttpPost("aiPost")]
//        //public async Task<string> SendImageToGoogleAsync(IFormFile image)
//        //{
//        //    // קח את מפתח ה־API מהסביבה
//        //    var apiKey = Environment.GetEnvironmentVariable("GOOGLE_API_KEY");

//        //    // הקישור המלא ל־Google Vision API עם המפתח
//        //    var apiUrl = $"https://vision.googleapis.com/v1/images:annotate?key={apiKey}";

//        //    // קריאת התמונה והמרה לבייס64
//        //    using var ms = new MemoryStream();
//        //    await image.CopyToAsync(ms);
//        //    var imageBytes = ms.ToArray();
//        //    var base64Image = Convert.ToBase64String(imageBytes);

//        //    // יצירת גוף הבקשה
//        //    var requestObject = new
//        //    {
//        //        requests = new[]
//        //        {
//        //        new
//        //        {
//        //            image = new { content = base64Image },
//        //            features = new[]
//        //            {
//        //                new { type = "LABEL_DETECTION" },
//        //                new { type = "SAFE_SEARCH_DETECTION" }
//        //            }
//        //        }
//        //    }
//        //    };

//        //    var json = JsonSerializer.Serialize(requestObject);
//        //    var content = new StringContent(json, Encoding.UTF8, "application/json");

//        //    using var httpClient = new HttpClient();
//        //    var response = await httpClient.PostAsync(apiUrl, content);

//        //    return await response.Content.ReadAsStringAsync();
//        //}


//        [HttpPost]
//        // לוגין רגיל (ל-React)
//        [HttpPost("login")]
//        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
//        {
//            if (loginModel == null || string.IsNullOrWhiteSpace(loginModel.UserName) || string.IsNullOrWhiteSpace(loginModel.Password))
//            {
//                return BadRequest(new { message = "Username and password are required." });
//            }

//            var user = await _context.userList
//                .FirstOrDefaultAsync(u => u.UserName == loginModel.UserName);

//            if (user == null || user.UserEncryptedPassword != loginModel.Password)
//            {
//                return Unauthorized(new { message = "Invalid username or password." });
//            }

//            var claims = new List<Claim>
//    {
//        new Claim(ClaimTypes.Name, user.UserEmail),
//        new Claim(ClaimTypes.Role, user.UserRole)
//    };

//            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
//            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

//            var tokenOptions = new JwtSecurityToken(
//                issuer: _configuration["JWT:Issuer"],
//                audience: _configuration["JWT:Audience"],
//                claims: claims,
//                expires: DateTime.UtcNow.AddMinutes(30),
//                signingCredentials: signinCredentials
//            );

//            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

//            return Ok(new { token = tokenString });
//        }

//        // לוגין למנהלים (ל-Angular)
//        [HttpPost("admin-login")]
//        public async Task<IActionResult> AdminLogin([FromBody] LoginModel loginModel)
//        {
//            if (loginModel == null || string.IsNullOrWhiteSpace(loginModel.UserName) || string.IsNullOrWhiteSpace(loginModel.Password))
//            {
//                return BadRequest(new { message = "Username and password are required." });
//            }

//            var user = await _context.userList
//                .FirstOrDefaultAsync(u => u.UserName == loginModel.UserName);

//            if (user == null || user.UserEncryptedPassword != loginModel.Password)
//            {
//                return Unauthorized(new { message = "Invalid username or password." });
//            }

//            // בדוק אם המשתמש הוא מנהל
//            if (user.UserRole != "Admin")
//            {
//                return Unauthorized(new { message = "You do not have administrator privileges." });
//            }

//            var claims = new List<Claim>
//    {
//        new Claim(ClaimTypes.Name, user.UserEmail),
//        new Claim(ClaimTypes.Role, user.UserRole)
//    };

//            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
//            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

//            var tokenOptions = new JwtSecurityToken(
//                issuer: _configuration["JWT:Issuer"],
//                audience: _configuration["JWT:Audience"],
//                claims: claims,
//                expires: DateTime.UtcNow.AddMinutes(30),
//                signingCredentials: signinCredentials
//            );

//            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

//            return Ok(new { token = tokenString });
//        }
//    }
//}







//using FinalProject.API.Models;
//using FinalProject.Data;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.IdentityModel.Tokens;
//using System;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;

//namespace FinalProject.API.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class AuthController : ControllerBase
//    {
//        private readonly IConfiguration _configuration;
//        private readonly DataContext _context;

//        public AuthController(IConfiguration configuration, DataContext context)
//        {
//            _configuration = configuration;
//            _context = context;
//        }

//        // FIX: Add default route for regular API/Auth endpoint as used by LoginComp
//        [HttpPost]
//        public async Task<IActionResult> DefaultLogin([FromBody] LoginModel loginModel)
//        {
//            // Redirect to the login endpoint
//            return await Login(loginModel);
//        }

//        // Regular login endpoint 
//        [HttpPost("login")]
//        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
//        {
//            if (loginModel == null || string.IsNullOrWhiteSpace(loginModel.UserName) || string.IsNullOrWhiteSpace(loginModel.UserEncryptedPassword))
//            {
//                return BadRequest(new { message = "Username and password are required." });
//            }

//            var user = await _context.userList
//                .FirstOrDefaultAsync(u => u.UserName == loginModel.UserName);

//            if (user == null || user.UserEncryptedPassword != loginModel.UserEncryptedPassword)
//            {
//                return Unauthorized(new { message = "Invalid username or password." });
//            }

//            var claims = new List<Claim>
//            {
//                new Claim(ClaimTypes.Name, user.UserName),
//                new Claim(ClaimTypes.Email, user.UserEmail),
//                new Claim(ClaimTypes.Role, user.UserRole),
//                new Claim("UserId", user.UserId.ToString())
//            };

//            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
//            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

//            var tokenOptions = new JwtSecurityToken(
//                issuer: _configuration["JWT:Issuer"],
//                audience: _configuration["JWT:Audience"],
//                claims: claims,
//                expires: DateTime.UtcNow.AddMinutes(30),
//                signingCredentials: signinCredentials
//            );

//            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

//            // FIX: Return more user information to match what the client expects
//            return Ok(new
//            {
//                token = tokenString,
//                userId = user.UserId,
//                userName = user.UserName,
//                email = user.UserEmail,
//                role = user.UserRole
//            });
//        }

//        // Admin login endpoint remains the same
//        [HttpPost("admin-login")]
//        public async Task<IActionResult> AdminLogin([FromBody] LoginModel loginModel)
//        {
//            // Code unchanged...
//            if (loginModel == null || string.IsNullOrWhiteSpace(loginModel.UserName) || string.IsNullOrWhiteSpace(loginModel.UserEncryptedPassword))
//            {
//                return BadRequest(new { message = "Username and password are required." });
//            }

//            var user = await _context.userList
//                .FirstOrDefaultAsync(u => u.UserName == loginModel.UserName);

//            if (user == null || user.UserEncryptedPassword != loginModel.UserEncryptedPassword)
//            {
//                return Unauthorized(new { message = "Invalid username or password." });
//            }

//            // בדוק אם המשתמש הוא מנהל
//            if (user.UserRole != "Admin")
//            {
//                return Unauthorized(new { message = "You do not have administrator privileges." });
//            }

//            var claims = new List<Claim>
//            {
//                new Claim(ClaimTypes.Name, user.UserName),
//                new Claim(ClaimTypes.Email, user.UserEmail),
//                new Claim(ClaimTypes.Role, user.UserRole),
//                new Claim("UserId", user.UserId.ToString())
//            };

//            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
//            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

//            var tokenOptions = new JwtSecurityToken(
//                issuer: _configuration["JWT:Issuer"],
//                audience: _configuration["JWT:Audience"],
//                claims: claims,
//                expires: DateTime.UtcNow.AddMinutes(30),
//                signingCredentials: signinCredentials
//            );

//            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

//            // FIX: Return more user information to match what the client expects
//            return Ok(new
//            {
//                token = tokenString,
//                userId = user.UserId,
//                userName = user.UserName,
//                email = user.UserEmail,
//                role = user.UserRole
//            });
//        }

//        // FIX: Add an endpoint to get current user info from token
//        [HttpGet("user")]
//        public async Task<IActionResult> GetCurrentUser()
//        {
//            // Get user claims from token
//            var identity = HttpContext.User.Identity as ClaimsIdentity;
//            if (identity == null)
//            {
//                return Unauthorized(new { message = "No authentication token provided." });
//            }

//            var userIdClaim = identity.FindFirst("UserId");
//            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
//            {
//                return Unauthorized(new { message = "Invalid authentication token." });
//            }

//            var user = await _context.userList.FindAsync(userId);
//            if (user == null)
//            {
//                return NotFound(new { message = "User not found." });
//            }

//            return Ok(new
//            {
//                userId = user.UserId,
//                userName = user.UserName,
//                email = user.UserEmail,
//                role = user.UserRole
//            });
//        }
//    }
//}













using FinalProject.API.Models;
using FinalProject.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authorization;

namespace FinalProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly DataContext _context;

        public AuthController(IConfiguration configuration, DataContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> DefaultLogin([FromBody] LoginModel loginModel)
        {
            // Redirect to the login endpoint
            return await Login(loginModel);
        }

        // Regular login endpoint 
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            try
            {
                // Enhanced validation and logging
                if (loginModel == null)
                {
                    Console.WriteLine("LoginModel is null");
                    return BadRequest(new { message = "Invalid request data." });
                }

                if (string.IsNullOrWhiteSpace(loginModel.UserName))
                {
                    Console.WriteLine("UserName is null or empty");
                    return BadRequest(new { message = "Username is required." });
                }

                if (string.IsNullOrWhiteSpace(loginModel.UserEncryptedPassword))
                {
                    Console.WriteLine("Password is null or empty");
                    return BadRequest(new { message = "Password is required." });
                }

                Console.WriteLine($"Login attempt for user: {loginModel.UserName}");

                // Get user from database
                var user = await _context.userList
                    .FirstOrDefaultAsync(u => u.UserName == loginModel.UserName);

                if (user == null)
                {
                    Console.WriteLine($"User not found: {loginModel.UserName}");
                    return Unauthorized(new { message = "Invalid username or password." });
                }

                Console.WriteLine($"User found: {user.UserName}");
                Console.WriteLine($"Stored password: {user.UserEncryptedPassword}");
                Console.WriteLine($"Provided password: {loginModel.UserEncryptedPassword}");

                // Simple direct comparison since passwords are stored as plain text
                bool passwordValid = user.UserEncryptedPassword == loginModel.UserEncryptedPassword;

                if (!passwordValid)
                {
                    Console.WriteLine("Password verification failed");
                    return Unauthorized(new { message = "Invalid username or password." });
                }

                Console.WriteLine("Password verification successful");

                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Email, user.UserEmail ?? ""),
                    new Claim(ClaimTypes.Role, user.UserRole ?? "User"),
                    new Claim("UserId", user.UserId.ToString())
                };

                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var tokenOptions = new JwtSecurityToken(
                    issuer: _configuration["JWT:Issuer"],
                    audience: _configuration["JWT:Audience"],
                    claims: claims,
                    expires: DateTime.UtcNow.AddMinutes(30),
                    signingCredentials: signinCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

                Console.WriteLine("Token generated successfully");

                // Return user information
                return Ok(new
                {
                    token = tokenString,
                    userId = user.UserId,
                    userName = user.UserName,
                    email = user.UserEmail ?? "",
                    role = user.UserRole ?? "User"
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Login error: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                return StatusCode(500, new { message = "Internal server error during login." });
            }
        }

        // Admin login endpoint
        [HttpPost("admin-login")]
        public async Task<IActionResult> AdminLogin([FromBody] LoginModel loginModel)
        {
            try
            {
                if (loginModel == null || string.IsNullOrWhiteSpace(loginModel.UserName) || string.IsNullOrWhiteSpace(loginModel.UserEncryptedPassword))
                {
                    return BadRequest(new { message = "Username and password are required." });
                }

                var user = await _context.userList
                    .FirstOrDefaultAsync(u => u.UserName == loginModel.UserName);

                if (user == null)
                {
                    return Unauthorized(new { message = "Invalid username or password." });
                }

                // Password verification (same logic as regular login)
                bool passwordValid = user.UserEncryptedPassword == loginModel.UserEncryptedPassword;

                if (!passwordValid)
                {
                    return Unauthorized(new { message = "Invalid username or password." });
                }

                // Check if user is admin
                if (user.UserRole != "Admin")
                {
                    return Unauthorized(new { message = "You do not have administrator privileges." });
                }

                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Email, user.UserEmail ?? ""),
                    new Claim(ClaimTypes.Role, user.UserRole),
                    new Claim("UserId", user.UserId.ToString())
                };

                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var tokenOptions = new JwtSecurityToken(
                    issuer: _configuration["JWT:Issuer"],
                    audience: _configuration["JWT:Audience"],
                    claims: claims,
                    expires: DateTime.UtcNow.AddMinutes(30),
                    signingCredentials: signinCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

                return Ok(new
                {
                    token = tokenString,
                    userId = user.UserId,
                    userName = user.UserName,
                    email = user.UserEmail ?? "",
                    role = user.UserRole
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Admin login error: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error during admin login." });
            }
        }

        // Get current user endpoint
        [HttpGet("user")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUser()
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                if (identity == null)
                {
                    return Unauthorized(new { message = "No authentication token provided." });
                }

                var userIdClaim = identity.FindFirst("UserId");
                if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                {
                    return Unauthorized(new { message = "Invalid authentication token." });
                }

                var user = await _context.userList.FindAsync(userId);
                if (user == null)
                {
                    return NotFound(new { message = "User not found." });
                }

                return Ok(new
                {
                    userId = user.UserId,
                    userName = user.UserName,
                    email = user.UserEmail ?? "",
                    role = user.UserRole ?? "User"
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Get current user error: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error." });
            }
        }

        // Test endpoint to check if API is working
        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok(new { message = "Auth API is working", timestamp = DateTime.Now });
        }
    }
}
