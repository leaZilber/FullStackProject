using AutoMapper;
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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TestResualtController : ControllerBase
    {
        private readonly ITestResualtService _testResualtService;
        private readonly IMapper _mapper;

        public TestResualtController(ITestResualtService testResualtService, IMapper mapper)
        {
            _testResualtService = testResualtService;
            _mapper = mapper;
        }
        // GET: api/<TestResualtController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var testResualts = await _testResualtService.GetAllTestResualtAsync();
            return Ok(testResualts);
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {

            var test = _testResualtService.GetTestResualt(id);
            var testDto = _mapper.Map<TestResaultDTO>(test);
            return Ok(testDto);
        }

        // POST api/<UserController>
        //[HttpPost]
        //public async Task<ActionResult> Post([FromBody] TestResualt value)
        //{
        //    var newTestResault = await _testResualtService.AddAsync(value);
        //    return Ok(newTestResault);
        //}
        //[HttpPost]
        //public async Task<ActionResult> Post([FromBody] TestResualt value)
        //{
        //    try
        //    {
        //        // הוסף לוג לבדיקה
        //        Console.WriteLine($"Attempting to save test result for user: {value.UserId}");

        //        var newTestResault = await _testResualtService.AddAsync(value);

        //        Console.WriteLine($"Successfully saved test result with ID: {newTestResault.TestId}");

        //        return Ok(newTestResault);
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine($"Error saving test result: {ex.Message}");
        //        return StatusCode(500, new { error = ex.Message, success = false });
        //    }
        //}


        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TestResualt value)
        {
            try
            {
                // הוסף לוג לבדיקה
                Console.WriteLine($"Attempting to save test result for user: {value.UserId}");

                var newTestResault = await _testResualtService.AddAsync(value);

                Console.WriteLine($"Successfully saved test result with ID: {newTestResault.TestId}");

                return Ok(newTestResault);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error saving test result: {ex.Message}");
                return StatusCode(500, new { error = ex.Message, success = false });
            }
        }


        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put([FromBody] TestResualt value)
        {
            var upTest = await _testResualtService.UpDateAsync(value);
            return Ok(upTest);
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            _testResualtService.Delete(id);
            return Ok();
        }
    }
}


//using AutoMapper;
//using FinalProject.Core;
//using FinalProject.Core.DTOs;
//using FinalProject.Core.IServices;
//using FinalProject.Core.Models;
//using FinalProject.Service.Services;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Http;
//using System.IO;
//using System.Threading.Tasks;
//using System;
//using Microsoft.AspNetCore.Authorization;

//namespace FinalProject.API.Controllers
//{
//    [Authorize]

//    [Route("api/[controller]")]
//    [ApiController]
//    public class TestResualtController : ControllerBase
//    {
//        private readonly ITestResualtService _testResualtService;
//        private readonly IMapper _mapper;
//        private readonly IUserService _userService;
//        public TestResualtController(ITestResualtService testResualtService, IMapper mapper, IUserService userService)
//        {
//            _testResualtService = testResualtService;
//            _mapper = mapper;
//            _userService = userService;
//        }

//        // GET: api/<TestResualtController>
//        [HttpGet]
//        public async Task<ActionResult> Get()
//        {
//            var testResualts = await _testResualtService.GetAllTestResualtAsync();
//            return Ok(testResualts);
//        }

//        // GET api/<UserController>/5
//        [HttpGet("{id}")]
//        public ActionResult Get(int id)
//        {
//            var test = _testResualtService.GetTestResualt(id);
//            var testDto = _mapper.Map<TestResaultDTO>(test);
//            return Ok(testDto);
//        }

// POST api/<UserController>
//[HttpPost]
//public async Task<ActionResult> Post([FromForm] IFormFile file, [FromForm] int patientId, [FromForm] string summary, [FromForm] string doctorLicenseNumber)
//{
//    if (file == null || file.Length == 0)
//    {
//        return BadRequest("No file uploaded.");
//    }

//    // שמירת הקובץ
//    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles", file.FileName);
//    using (var stream = new FileStream(filePath, FileMode.Create))
//    {
//        await file.CopyToAsync(stream);
//    }

//    // יצירת אובייקט TestResult
//    var testResult = new TestResualt
//    {
//        TestDate = DateTime.Now,
//        ImageFileData = await System.IO.File.ReadAllBytesAsync(filePath),
//        PatientId = patientId,
//        Summary = summary
//    };

//    // שמירה למסד נתונים
//    var newTestResualt = await _testResualtService.AddAsync(testResult);

//    return Ok(newTestResualt);
//}
//[HttpPost]
//public async Task<ActionResult> Post([FromForm] IFormFile file, [FromForm] int patientId, [FromForm] string summary, [FromForm] string doctorLicenseNumber)
//{
//    if (file == null || file.Length == 0)
//    {
//        return BadRequest("No file uploaded.");
//    }

//    // שמירת הקובץ
//    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles", file.FileName);
//    using (var stream = new FileStream(filePath, FileMode.Create))
//    {
//        await file.CopyToAsync(stream);
//    }

//    // יצירת אובייקט TestResult
//    var testResult = new TestResualt
//    {
//        TestDate = DateTime.Now,
//        ImageFileData = await System.IO.File.ReadAllBytesAsync(filePath),
//        PatientId = patientId,
//        Summary = summary
//    };

//    // שמירה למסד נתונים
//    var newTestResualt = await _testResualtService.AddAsync(testResult);

//    // עדכון מערך תוצאות הבדיקות של המשתמש
//    await _testResualtService.GetAllTestResualtAsync(patientId, newTestResualt);

//    return Ok(newTestResualt);
//}


// PUT api/<UserController>/5
//[HttpPut("{id}")]
//public async Task<ActionResult> Put([FromBody] TestResualt value)
//{
//    var upTest = await _testResualtService.UpDateAsync(value);
//    return Ok(upTest);
//}

//// DELETE api/<UserController>/5
//[HttpDelete("{id}")]
//public ActionResult Delete(int id)
//{
//    _testResualtService.Delete(id);
//    return Ok();
//}

// פונקציה להחזרת התמונה המפוענחת
//[HttpGet("download/{fileName}")]
//public IActionResult DownloadImage(string fileName)
//{
//    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles", fileName);

//    if (!System.IO.File.Exists(filePath))
//    {
//        return NotFound("File not found.");
//    }

//    var fileBytes = System.IO.File.ReadAllBytes(filePath);
//    return File(fileBytes, "image/jpeg"); // דוגמה לתמונה מסוג JPEG
//}

// פונקציה לפיענוח התמונה (אם נדרש)
//[HttpGet("analyze/{fileName}")]
//public async Task<IActionResult> AnalyzeImage(string fileName)
//{
//    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles", fileName);

//    if (!System.IO.File.Exists(filePath))
//    {
//        return NotFound("File not found.");
//    }

//    // לוגיקה לפענוח התמונה
//    var image = await System.IO.File.ReadAllBytesAsync(filePath);

//    // כאן תוכל להוסיף לוגיקה של פיענוח התמונה אם יש צורך בפענוח נוסף
//    // לדוגמה, הוספת אלגוריתם ML או בדיקות אחרות

//    return Ok("File analyzed successfully.");
//}
//}
//}