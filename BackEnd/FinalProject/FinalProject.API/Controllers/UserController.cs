using AutoMapper;
using FinalProject.API.Models;
using FinalProject.Core;
using FinalProject.Core.DTOs;
using FinalProject.Core.IServices;
using FinalProject.Core.Models;
using Microsoft.AspNetCore.Mvc;
using FinalProject.API.Controllers;
using Microsoft.AspNetCore.Cors;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FinalProject.API.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }
        // GET: api/<UserController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {

            var user = _userService.GetUser(id);
            var userDto = _mapper.Map<UserDTO>(user);
            return Ok(userDto);
        }

        // POST api/<UserController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] UserPostModel value)
        {
            var userPost = new User
            (
                 value.UserName,
                 value.UserEmail,
                 value.UserEncryptedPassword
                 , value.UserRole,
                 value.UserPhone,
                 value.UserAddress,
                 value.UserBirth
            );
            var newUser = await _userService.AddAsync(userPost);
            return Ok(newUser);
        }

        // PUT api/<UserController>/5
        //[HttpPut("{id}")]
        ////[Authorize(UserRole = "Admin")]
        //public async Task<ActionResult> Put([FromBody] User value)
        //{
        //    var upUser = await _userService.UpDateAsync(value);
        //    return Ok(upUser);
        //}
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] UserUpdateModel value)
        {
            try
            {
                // Get the existing user first
                var existingUser = _userService.GetUser(id);
                if (existingUser == null)
                {
                    return NotFound($"User with ID {id} not found");
                }

                if (!string.IsNullOrEmpty(value.UserName))
                    existingUser.UserName = value.UserName;

                if (!string.IsNullOrEmpty(value.UserEmail))
                    existingUser.UserEmail = value.UserEmail;

                if (!string.IsNullOrEmpty(value.UserEncryptedPassword))
                    existingUser.UserEncryptedPassword = value.UserEncryptedPassword;

                if (!string.IsNullOrEmpty(value.UserPhone))
                    existingUser.UserPhone = value.UserPhone;

                if (!string.IsNullOrEmpty(value.UserAddress))
                    existingUser.UserAddress = value.UserAddress;

                if (value.UserBirth.HasValue)
                    existingUser.UserBirth = value.UserBirth.Value;

                if (!string.IsNullOrEmpty(value.UserRole))
                    existingUser.UserRole = value.UserRole;

                var updatedUser = await _userService.UpDateAsync(existingUser);
                return Ok(updatedUser);
            }
            catch (Exception ex)
            {
                // Log the exception for debugging
                Console.WriteLine($"Error updating user: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error", details = ex.Message });
            }
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        //[Authorize(UserRole="Admin")]
        public ActionResult Delete(int id)
        {
            _userService.Delete(id);
            return Ok();
        }

        //[HttpGet("busiest-hours")]
        //public async Task<ActionResult> GetBusiestHours()
        //{
        //    var users = await _userService.GetAllUsersAsync();

        //    var result = users
        //        .GroupBy(u => new { Day = u.UserCreateDate.DayOfWeek, Hour = u.UserCreateDate.Hour })
        //        .Select(g => new
        //        {
        //            Day = g.Key.Day.ToString(), // Sunday, Monday...
        //            Hour = g.Key.Hour,          // 0–23
        //            Count = g.Count()
        //        })
        //        .OrderBy(r => r.Day)
        //        .ThenBy(r => r.Hour)
        //        .ToList();

        //    return Ok(result);
        //}


        [HttpGet("users-over-time")]
        public async Task<ActionResult<IEnumerable<UserStatsPerDay>>> GetUsersOverTime()
        {
            var stats = await _userService.GetUserStatsOverTime();
            return Ok(stats);
        }
    }
}

