//using AutoMapper;
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
//    //[Authorize]
//    [Route("api/[controller]")]
//    [ApiController]
//    public class TestResualtController : ControllerBase
//    {
//        private readonly ITestResualtService _testResualtService;
//        private readonly IMapper _mapper;

//        public TestResualtController(ITestResualtService testResualtService, IMapper mapper)
//        {
//            _testResualtService = testResualtService;
//            _mapper = mapper;
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

//        // POST api/<UserController>
//        [HttpPost]
//        public async Task<ActionResult> Post([FromBody] TestResualt value)
//        {
//            var newTestResault = await _testResualtService.AddAsync(value);
//            return Ok(newTestResault);
//        }

//        // PUT api/<UserController>/5
//        [HttpPut("{id}")]
//        public async Task<ActionResult> Put([FromBody] TestResualt value)
//        {
//            var upTest = await _testResualtService.UpDateAsync(value);
//            return Ok(upTest);
//        }

//        // DELETE api/<UserController>/5
//        [HttpDelete("{id}")]
//        public ActionResult Delete(int id)
//        {
//            _testResualtService.Delete(id);
//            return Ok();
//        }
//    }
//}


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



















using AutoMapper;
using FinalProject.Core;
using FinalProject.Core.DTOs;
using FinalProject.Core.IServices;
using FinalProject.Core.Models;
using FinalProject.Service.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FinalProject.API.Controllers
{
    //[Authorize]
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
            try
            {
                var testResualts = await _testResualtService.GetAllTestResualtAsync();
                return Ok(testResualts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        // GET api/<TestResualtController>/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest(new { error = "Invalid ID" });
                }

                var test = _testResualtService.GetTestResualt(id);
                if (test == null)
                {
                    return NotFound(new { error = "Test result not found" });
                }

                var testDto = _mapper.Map<TestResaultDTO>(test);
                return Ok(testDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        // POST api/<TestResualtController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TestResualt value)
        {
            try
            {
                if (value == null)
                {
                    return BadRequest(new { error = "Invalid data" });
                }

                // הוספת לוגים לדיבוג
                Console.WriteLine($"Received TestResualt: UserId={value.UserId}, Summary={value.Summary}, ImgURL={value.ImgURL}");

                var newTestResault = await _testResualtService.AddAsync(value);

                Console.WriteLine($"Saved TestResualt with ID: {newTestResault.TestId}");

                return Ok(newTestResault);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error saving TestResualt: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        // PUT api/<TestResualtController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] TestResualt value)
        {
            try
            {
                if (value == null)
                {
                    return BadRequest(new { error = "Invalid data" });
                }

                if (id <= 0)
                {
                    return BadRequest(new { error = "Invalid ID" });
                }

                // וודא שה-ID של הערך תואם לפרמטר
                value.TestId = id;

                var upTest = await _testResualtService.UpDateAsync(value);
                return Ok(upTest);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        // DELETE api/<TestResualtController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest(new { error = "Invalid ID" });
                }

                _testResualtService.Delete(id);
                return Ok(new { message = "Deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}