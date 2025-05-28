//using FinalProject.Core.IRepositories;
//using FinalProject.Core.IServices;
//using FinalProject.Core.Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace FinalProject.Service.Services
//{
//    public class ScheduleService : IScheduleService
//    {
//        private readonly IScheduleRepository _scheduleRepository;
//        public ScheduleService(IScheduleRepository scheduleRepository)
//        {
//            _scheduleRepository = scheduleRepository;
//        }
//        public async Task<List<Schedule>> GetAllSchedulesAsync()
//        {
//            return await _scheduleRepository.GetAllAsync();
//        }

//        public Schedule? GetSchedule(int id)
//        {
//            return _scheduleRepository.GetById(id);
//        }

//        public async Task<Schedule> AddAsync(Schedule sched)
//        {
//            return await _scheduleRepository.AddAsync(sched);
//        }
//        public async Task<Schedule> UpDateAsync(Schedule user)
//        {
//            return await _scheduleRepository.UpdateAsync(user);
//        }

//        public void Delete(int id)
//        {
//            _scheduleRepository.Delete(id);
//        }
//    }
//}
