//// Services/VisionService.cs
//using System;
//using System.IO;
//using System.Net.Http;
//using System.Text;
//using System.Text.Json;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Http;

//namespace FinalProject.Service.Services
//{
//    public class VisionService
//    {
//        public async Task<string> SendImageToGoogleAsync(IFormFile image)
//        {
//            var apiKey = Environment.GetEnvironmentVariable("GOOGLE_API_KEY");
//            var apiUrl = $"https://vision.googleapis.com/v1/images:annotate?key={apiKey}";

//            using var ms = new MemoryStream();
//            await image.CopyToAsync(ms);
//            var imageBytes = ms.ToArray();
//            var base64Image = Convert.ToBase64String(imageBytes);

//            var requestObject = new
//            {
//                requests = new[]
//                {
//                    new
//                    {
//                        image = new { content = base64Image },
//                        features = new[]
//                        {
//                            new { type = "LABEL_DETECTION" },
//                            new { type = "SAFE_SEARCH_DETECTION" }
//                        }
//                    }
//                }
//            };

//            var json = JsonSerializer.Serialize(requestObject);
//            var content = new StringContent(json, Encoding.UTF8, "application/json");

//            using var httpClient = new HttpClient();
//            var response = await httpClient.PostAsync(apiUrl, content);

//            return await response.Content.ReadAsStringAsync();
//        }

//        public string AnalyzeResponse(string jsonResponse)
//        {
//            var response = JsonSerializer.Deserialize<VisionApiResponse>(jsonResponse);
//            var suspiciousLabels = new[] { "melanoma", "skin cancer", "tumor", "lesion", "cancer" };

//            var detectedLabels = response.Responses[0].LabelAnnotations
//                .Where(label => suspiciousLabels.Contains(label.Description.ToLower()))
//                .OrderByDescending(label => label.Score)
//                .ToList();

//            if (detectedLabels.Any() && detectedLabels.First().Score > 0.7)
//            {
//                return "נראה חשש למלנומה או סרטן עור – מומלץ לפנות לרופא.";
//            }

//            return "אין ממצאים חשודים.";
//        }
//    }
//}