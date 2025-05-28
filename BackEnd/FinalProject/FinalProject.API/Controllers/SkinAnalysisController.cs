//using Microsoft.AspNetCore.Mvc;
//using System.Net.Http.Headers;

//namespace SkinCheckAPI.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class SkinAnalysisController : ControllerBase
//    {
//        private readonly IHttpClientFactory _httpClientFactory;
//        private readonly IConfiguration _configuration;

//        public SkinAnalysisController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
//        {
//            _httpClientFactory = httpClientFactory;
//            _configuration = configuration;
//        }

//        [HttpPost("analyze")]
//        public async Task<IActionResult> AnalyzeSkin([FromForm] IFormFile image)
//        {
//            if (image == null || image.Length == 0)
//                return BadRequest("No image uploaded.");

//            var apiUrl = Environment.GetEnvironmentVariable("AI_API_URL");
//            var apiKey = Environment.GetEnvironmentVariable("AI_API_KEY");

//            if (string.IsNullOrEmpty(apiUrl) || string.IsNullOrEmpty(apiKey))
//                return StatusCode(500, "Missing API configuration.");

//            using var client = _httpClientFactory.CreateClient();
//            using var content = new MultipartFormDataContent();
//            await using var imageStream = image.OpenReadStream();
//            var imageContent = new StreamContent(imageStream);
//            imageContent.Headers.ContentType = MediaTypeHeaderValue.Parse(image.ContentType);
//            content.Add(imageContent, "image", image.FileName);

//            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
//            var response = await client.PostAsync(apiUrl, content);

//            if (!response.IsSuccessStatusCode)
//                return StatusCode((int)response.StatusCode, await response.Content.ReadAsStringAsync());

//            var result = await response.Content.ReadAsStringAsync();
//            return Ok(result);
//        }
//    }
//}







//using FinalProject.Service.Services;
//using Microsoft.AspNetCore.Mvc;

//namespace SkinCheckAPI.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class SkinAnalysisController : ControllerBase
//    {
//        private readonly VisionService _visionService;

//        public SkinAnalysisController(VisionService visionService)
//        {
//            _visionService = visionService;
//        }

//        [HttpPost("analyze")]
//        public async Task<IActionResult> AnalyzeSkin([FromForm] IFormFile image)
//        {
//            if (image == null || image.Length == 0)
//                return BadRequest("No image uploaded.");

//            try
//            {
//                var jsonResponse = await _visionService.SendImageToGoogleAsync(image);
//                var result = _visionService.AnalyzeResponse(jsonResponse);
//                return Ok(result);
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, $"Internal server error: {ex.Message}");
//            }
//        }
//    }
//}
