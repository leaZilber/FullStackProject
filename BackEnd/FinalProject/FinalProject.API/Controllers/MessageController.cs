using AutoMapper;
using FinalProject.API.Models;
using FinalProject.Core;
using FinalProject.Core.DTOs;
using FinalProject.Core.IServices;
using FinalProject.Core.Models;
using FinalProject.Service.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FinalProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IMessageService _messageService;
        private readonly IMapper _mapper;

        public MessageController(IMessageService messageService, IMapper mapper)
        {
            _messageService = messageService;
            _mapper = mapper;
        }
        // GET: api/<MessageController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var messages = await _messageService.GetAllMessagesAsync();
            return Ok(messages);
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            var message = _messageService.GetMessage(id);
            var messageDto = _mapper.Map<MessageDTO>(message);
            return Ok(messageDto);
        }

        // POST api/<UserController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] MessagePostModel value)
        {
            var messagePost = new Message
            (
                value.UserId,
               value.SenderId,
               value.MessageContent,
               DateTime.Now
            );
            var newMessage = await _messageService.AddAsync(messagePost);
            return Ok(newMessage);
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put([FromBody] Message value)
        {
            var upMessage = await _messageService.UpDateAsync(value);
            return Ok(upMessage);
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            _messageService.Delete(id);
            return Ok();
        }
    }
}
