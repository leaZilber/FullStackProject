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
using FinalProject.API.Models;
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

        //// POST api/<TestResualtController>
        //[HttpPost]
        //public async Task<ActionResult> Post([FromBody] TestPostModel value)
        //{

        //    var testPost = new TestResualt(
        //        value.UserId,
        //         value.TestDate,
        //         value.ImgURL,
        //        value.Summary

        //    );
        //    var newDoctor = await _testResualtService.AddAsync(testPost);
        //    return Ok(newDoctor);

        //}
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TestPostModel value)
        {
            try
            {
                Console.WriteLine("=== POST TestResult Debug ===");
                Console.WriteLine($"Received data: {System.Text.Json.JsonSerializer.Serialize(value)}");

                // וודא שהנתונים תקינים
                if (value == null)
                {
                    Console.WriteLine("ERROR: value is null");
                    return BadRequest(new { error = "Invalid data provided" });
                }

                Console.WriteLine($"UserId: {value.UserId}");
                Console.WriteLine($"TestDate: {value.TestDate}");
                Console.WriteLine($"ImgURL: {value.ImgURL}");
                Console.WriteLine($"Summary length: {value.Summary?.Length ?? 0}");

                if (value.UserId <= 0)
                {
                    Console.WriteLine("ERROR: Invalid User ID");
                    return BadRequest(new { error = "Invalid User ID" });
                }

                if (string.IsNullOrEmpty(value.ImgURL))
                {
                    Console.WriteLine("ERROR: Image URL is empty");
                    return BadRequest(new { error = "Image URL is required" });
                }

                if (string.IsNullOrEmpty(value.Summary))
                {
                    Console.WriteLine("ERROR: Summary is empty");
                    return BadRequest(new { error = "Summary is required" });
                }



                Console.WriteLine("Creating TestResult entity...");
                var testPost = new TestResualt(
                    value.UserId,
                    value.TestDate,
                    value.ImgURL,
                    value.Summary
                );

                Console.WriteLine($"Entity created: TestId={testPost.TestId}, UserId={testPost.UserId}");
                Console.WriteLine("Calling service AddAsync...");

                var newTest = await _testResualtService.AddAsync(testPost);

                Console.WriteLine($"Test result saved successfully with ID: {newTest?.TestId}");
                Console.WriteLine("=== POST TestResult Success ===");

                return Ok(newTest);
            }
            catch (Exception ex)
            {
                Console.WriteLine("=== POST TestResult Error ===");
                Console.WriteLine($"Error type: {ex.GetType().Name}");
                Console.WriteLine($"Error message: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");

                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner exception: {ex.InnerException.Message}");
                    Console.WriteLine($"Inner stack trace: {ex.InnerException.StackTrace}");
                }

                return StatusCode(500, new
                {
                    error = ex.Message,
                    innerError = ex.InnerException?.Message,
                    type = ex.GetType().Name
                });
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