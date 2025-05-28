//// Controllers/ImageController.cs
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Http;
//using System.Threading.Tasks;

//namespace YourNamespace.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class ImageController : ControllerBase
//    {
//        private readonly VisionService _visionService;

//        public ImageController(VisionService visionService)
//        {
//            _visionService = visionService;
//        }

//        [HttpPost("analyze")]
//        public async Task<IActionResult> AnalyzeImage(IFormFile image)
//        {
//            if (image == null || image.Length == 0)
//            {
//                return BadRequest("No image uploaded.");
//            }

//            var result = await _visionService.SendImageToGoogleAsync(image);
//            var analysisResult = _visionService.AnalyzeResponse(result);

//            return Ok(analysisResult);
//        }
//    }
//}
