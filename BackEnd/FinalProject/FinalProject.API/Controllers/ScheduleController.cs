//using AutoMapper;
//using FinalProject.API.Models;
//using FinalProject.Core;
//using FinalProject.Core.DTOs;
//using FinalProject.Core.IServices;
//using FinalProject.Core.Models;
//using FinalProject.Service.Services;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;

//// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

//namespace FinalProject.API.Controllers
//{
//    [Authorize]
//    [Route("api/[controller]")]
//    [ApiController]
//    public class ScheduleController : ControllerBase
//    {
//        private readonly IScheduleService _scheduleService;
//        private readonly IMapper _mapper;

//        public ScheduleController(IScheduleService scheduleService, IMapper mapper)
//        {
//            _scheduleService = scheduleService;
//            _mapper = mapper;
//        }
//        // GET: api/<ScheduleController>

//        [HttpGet]
//        public async Task<ActionResult> Get()
//        {
//            var sched = await _scheduleService.GetAllSchedulesAsync();
//            return Ok(sched);
//        }

//        // GET api/<UserController>/5
//        [HttpGet("{id}")]
//        public ActionResult Get(int id)
//        {
//            var sched = _scheduleService.GetSchedule(id);
//            var scheduleDto = _mapper.Map<ScheduleDTO>(sched);
//            return Ok(scheduleDto);
//        }

//        // POST api/<UserController>
//        [HttpPost]
//        public async Task<ActionResult> Post([FromBody] SchedulePostModel value)
//        {
//            var schedulePost = new Schedule()
//            {
//                DoctorId = value.DoctorId,
//                Turns = value.Turns,
//                //=value.ScheduleId,
//                //DoctorId=value.
//            };
//            var newSchedule = await _scheduleService.AddAsync(schedulePost);
//            return Ok(newSchedule);
//        }

//        // PUT api/<UserController>/5
//        [HttpPut("{id}")]
//        public async Task<ActionResult> Put([FromBody] Schedule value)
//        {
//            var upSchedule = await _scheduleService.UpDateAsync(value);
//            return Ok(upSchedule);
//        }

//        // DELETE api/<UserController>/5
//        [HttpDelete("{id}")]
//        public ActionResult Delete(int id)
//        {
//            _scheduleService.Delete(id);
//            return Ok();
//        }
//    }
//}
