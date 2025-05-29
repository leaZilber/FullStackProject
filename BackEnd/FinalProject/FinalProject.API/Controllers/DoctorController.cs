using AutoMapper;
using FinalProject.API.Models;
using FinalProject.Core;
using FinalProject.Core.DTOs;
using FinalProject.Core.IServices;
using FinalProject.Core.Models;
using FinalProject.Service.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FinalProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly IDoctorService _doctorService;
        private readonly IMapper _mapper;

        public DoctorController(IDoctorService doctorService, IMapper mapper)
        {
            _doctorService = doctorService;
            _mapper = mapper;
        }

        // GET: api/<DoctorController>
        [HttpGet]
        [AllowAnonymous]

        public async Task<ActionResult> Get()
        {
            var doctors = await _doctorService.GetAllDoctorsAsync();
            return Ok(doctors);
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public ActionResult Get(int id)
        {
            var doctor = _doctorService.GetDoctor(id);
            var doctorDto = _mapper.Map<DoctorDTO>(doctor);
            return Ok(doctorDto);
        }

        // POST api/<UserController>
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> Post([FromBody] DoctorPostModel value)
        {
            var doctorPost = new Doctor(
                value.DoctorName,
                value.FieldOfSpecialization,
                value.LicenseNumber   
            );
            var newDoctor = await _doctorService.AddAsync(doctorPost);
            return Ok(newDoctor);
        }
        [AllowAnonymous]
        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put([FromBody] Doctor value)
        {
            var upDoctor = await _doctorService.UpDateAsync(value);
            return Ok(upDoctor);
        }
        [AllowAnonymous]
        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            _doctorService.Delete(id);
            return Ok();
        }
    }
}
