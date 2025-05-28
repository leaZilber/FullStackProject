using AutoMapper;
using FinalProject.Core.DTOs;
using FinalProject.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Core
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Doctor, DoctorDTO>().ReverseMap();
            CreateMap<Message, MessageDTO>().ReverseMap();
            //CreateMap<Schedule, ScheduleDTO>().ReverseMap();
            CreateMap<TestResualt, TestResaultDTO>().ReverseMap();
            CreateMap<Turn, TurnDTO>().ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();
        }
    }
}
