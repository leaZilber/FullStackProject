using FinalProject.Core.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text;
using FinalProject.Core.IServices;

[ApiController]
[Route("api/[controller]")]
public class UploadController : ControllerBase
{
    private readonly S3Service _s3Service;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;
    private readonly ITestResualtService _testResultService;
    private readonly ILogger<UploadController> _logger;

    private readonly string _googleVisionApiKey;
    private readonly string _openAiApiKey;
    private readonly string _googleVisionBaseUrl;
    private readonly string _openAiBaseUrl;

    public UploadController(
        S3Service s3Service,
        IHttpClientFactory httpClientFactory,
        IConfiguration configuration,
        ITestResualtService testResultService,
        ILogger<UploadController> logger
    )
    {
        _s3Service = s3Service ?? throw new ArgumentNullException(nameof(s3Service));
        _httpClientFactory = httpClientFactory ?? throw new ArgumentNullException(nameof(httpClientFactory));
        _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        _testResultService = testResultService ?? throw new ArgumentNullException(nameof(testResultService));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _googleVisionApiKey = Environment.GetEnvironmentVariable("GOOGLE_VISION_AI_KEY") ??
            throw new InvalidOperationException("GOOGLE_VISION_AI_KEY configuration is missing");
        _openAiApiKey = Environment.GetEnvironmentVariable("OPEN_AI_KEY") ??
            throw new InvalidOperationException("OPEN_AI_KEY configuration is missing");
        _googleVisionBaseUrl = "https://vision.googleapis.com/v1/images:annotate";
        _openAiBaseUrl = "https://api.openai.com/v1/chat/completions";
    }
    [HttpGet("health-check")]
    //[Authorize(Roles = "Admin")] // רק למנהלים
    public IActionResult HealthCheck()
    {
        try
        {
            var status = new
            {
                Status = "Healthy",
                Timestamp = DateTime.UtcNow,
                Services = new
                {
                    GoogleVisionConfigured = !string.IsNullOrEmpty(_googleVisionApiKey),
                    OpenAiConfigured = !string.IsNullOrEmpty(_openAiApiKey),
                    S3ServiceReady = _s3Service != null
                },
                Environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Unknown"
            };

            return Ok(status);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Health check failed");
            return StatusCode(500, new { status = "Unhealthy", error = "Configuration check failed" });
        }
    }
#if DEBUG
    [HttpGet("debug/config-test")]
    public IActionResult DebugConfigurationTest()
    {
        try
        {
            var configs = new
            {
                HasGoogleVisionKey = !string.IsNullOrEmpty(Environment.GetEnvironmentVariable("GOOGLE_VISION_AI_KEY")),
                HasOpenAiKey = !string.IsNullOrEmpty(Environment.GetEnvironmentVariable("OPEN_AI_KEY")),
                HasAwsAccessKey = !string.IsNullOrEmpty(Environment.GetEnvironmentVariable("AWS_ACCESS_KEY")),
                HasAwsSecretKey = !string.IsNullOrEmpty(Environment.GetEnvironmentVariable("AWS_SECRET_KEY")),
                HasAwsRegion = !string.IsNullOrEmpty(Environment.GetEnvironmentVariable("AWS_REGION")),
                HasAwsBucket = !string.IsNullOrEmpty(Environment.GetEnvironmentVariable("AWS_BUCKET_NAME")),
                Environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")
            };

            return Ok(configs);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Debug configuration test failed");
            return StatusCode(500, new { error = "Configuration test failed" });
        }
    }
#endif


    [HttpPost("upload")]
    public async Task<IActionResult> UploadImage(IFormFile image)
    {

        if (image == null || image.Length == 0)
        {
            _logger.LogWarning("Upload attempt with no file");
            return BadRequest(new { error = "No file uploaded", success = false });
        }

        try
        {
            const int maxFileSize = 10 * 1024 * 1024;
            if (image.Length > maxFileSize)
            {
                _logger.LogWarning("File size exceeds limit: {FileSize} bytes", image.Length);
                return BadRequest(new { error = "File size exceeds 10MB limit", success = false });
            }

            var allowedTypes = new[] { "image/jpeg", "image/jpg", "image/png", "image/gif" };
            if (!allowedTypes.Contains(image.ContentType?.ToLower() ?? ""))
            {
                _logger.LogWarning("Invalid file type: {ContentType}", image.ContentType);
                return BadRequest(new { error = "Invalid file type. Only JPEG, PNG, and GIF are allowed.", success = false });
            }

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
            _logger.LogInformation("Starting image upload process for file: {FileName}", fileName);

            _logger.LogInformation("Configuration check - AWS Key exists: {HasAWS}, Google Vision Key exists: {HasVision}, OpenAI Key exists: {HasOpenAI}",
                !string.IsNullOrEmpty(Environment.GetEnvironmentVariable("AWS_ACCESS_KEY")),
                !string.IsNullOrEmpty(_googleVisionApiKey),
                !string.IsNullOrEmpty(_openAiApiKey));

            string imageUrl;

            try
            {
                using (var stream = image.OpenReadStream())
                {
                    string contentType = image.ContentType ?? "application/octet-stream"; // fallback if null
                    imageUrl = await _s3Service.UploadAsync(fileName, stream, contentType);
                }
                _logger.LogInformation("Image uploaded to S3: {ImageUrl}", imageUrl);
            }

            catch (Exception s3Ex)
            {
                _logger.LogError(s3Ex, "S3 Upload failed for file: {FileName}", fileName);

                var isDevelopment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development";
                return StatusCode(500, new
                {
                    error = "S3 Upload failed",
                    success = false,
                    details = isDevelopment ? s3Ex.Message : "S3 service error",
                    stackTrace = isDevelopment ? s3Ex.StackTrace : null,
                    innerException = isDevelopment && s3Ex.InnerException != null ? s3Ex.InnerException.Message : null,
                    fileName = fileName,
                    fileSize = image.Length,
                    contentType = image.ContentType
                });
            }
            string visionResults;
            try
            {
                visionResults = await AnalyzeImageWithGoogleVision(imageUrl);
                _logger.LogInformation("Vision analysis completed");
            }
            catch (Exception visionEx)
            {
                _logger.LogError(visionEx, "Google Vision analysis failed for image: {ImageUrl}", imageUrl);

                var isDevelopment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development";
                return StatusCode(500, new
                {
                    error = "Google Vision analysis failed",
                    success = false,
                    details = isDevelopment ? visionEx.Message : "Vision analysis error",
                    stackTrace = isDevelopment ? visionEx.StackTrace : null,
                    imageUrl = imageUrl
                });
            }

            string medicalAssessment;
            try
            {
                medicalAssessment = await GetMedicalAssessmentFromOpenAI(visionResults);
                _logger.LogInformation("Medical assessment completed");
            }
            catch (Exception openAiEx)
            {
                _logger.LogError(openAiEx, "OpenAI assessment failed for vision results: {VisionResults}", visionResults);

                var isDevelopment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development";
                return StatusCode(500, new
                {
                    error = "OpenAI medical assessment failed",
                    success = false,
                    details = isDevelopment ? openAiEx.Message : "Medical assessment error",
                    stackTrace = isDevelopment ? openAiEx.StackTrace : null,
                    visionResults = visionResults
                });
            }

            int? userId = GetAuthenticatedUserId();
            if (userId.HasValue)
            {
                try
                {
                    var testResult = new TestResualt
                    (
                       userId.Value,
                        DateTime.UtcNow,
                       imageUrl,
                        medicalAssessment
                    );
                    await _testResultService.AddAsync(testResult);
                    _logger.LogInformation("Test result saved for user: {UserId}", userId.Value);
                }
                catch (Exception dbEx)
                {
                    _logger.LogError(dbEx, "Database save failed for user: {UserId}", userId.Value);

                    _logger.LogWarning("Continuing despite database save failure");
                }
            }

            return Ok(new
            {
                fileUrl = imageUrl,
                summary = medicalAssessment,
                visionAnalysis = visionResults,
                success = true,
                timestamp = DateTime.UtcNow
            });
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogError(ex, "Configuration error during upload");
            var isDevelopment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development";
            return StatusCode(500, new
            {
                error = "Configuration error",
                success = false,
                details = isDevelopment ? ex.Message : "Configuration issue",
                stackTrace = isDevelopment ? ex.StackTrace : null
            });
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "HTTP request error during upload");
            var isDevelopment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development";
            return StatusCode(502, new
            {
                error = "External service error",
                success = false,
                details = isDevelopment ? ex.Message : "External API error",
                stackTrace = isDevelopment ? ex.StackTrace : null
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error during upload");
            var isDevelopment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development";
            return StatusCode(500, new
            {
                error = "An unexpected error occurred while processing the image",
                success = false,
                details = isDevelopment ? ex.Message : "Internal server error",
                stackTrace = isDevelopment ? ex.StackTrace : null,
                innerException = isDevelopment && ex.InnerException != null ? ex.InnerException.Message : null
            });
        }
    }

    private int? GetAuthenticatedUserId()
    {
        if (!User.Identity?.IsAuthenticated ?? false)
            return null;

        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
        if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int parsedUserId))
        {
            return parsedUserId;
        }

        return null;
    }


    private async Task<string> AnalyzeImageWithGoogleVision(string imageUrl)
    {
        _logger.LogInformation("Starting Google Vision analysis for URL: {ImageUrl}", imageUrl);

        var isAccessible = await IsImageAccessible(imageUrl);
        if (!isAccessible)
        {
            _logger.LogError("Image is not accessible: {ImageUrl}", imageUrl);
            return "התמונה לא נגישה לניתוח";
        }

        if (string.IsNullOrEmpty(_googleVisionApiKey))
        {
            _logger.LogError("Google Vision API Key is missing");
            return "חסר מפתח API של Google Vision";
        }

        var apiUrl = $"{_googleVisionBaseUrl}?key={_googleVisionApiKey}";

        try
        {
            var requestData = new
            {
                requests = new[]
                {
                new
                {
                    image = new { source = new { imageUri = imageUrl } },
                    features = new object[]
                    {
                        new { type = "LABEL_DETECTION", maxResults = 10 },
                        new { type = "OBJECT_LOCALIZATION", maxResults = 10 },
                        new { type = "TEXT_DETECTION", maxResults = 5 },
                        new { type = "SAFE_SEARCH_DETECTION" }
                    }
                }
            }
            };

            using var client = _httpClientFactory.CreateClient();
            client.Timeout = TimeSpan.FromSeconds(60); 

            client.DefaultRequestHeaders.Add("User-Agent", "YourApp/1.0");

            var jsonContent = JsonSerializer.Serialize(requestData, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });

            var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            _logger.LogInformation("Sending request to Google Vision API");
            var response = await client.PostAsync(apiUrl, content);

            var responseContent = await response.Content.ReadAsStringAsync();
            _logger.LogInformation("Google Vision Response Status: {StatusCode}", response.StatusCode);

            if (!response.IsSuccessStatusCode)
            {
                _logger.LogError("Google Vision API Error: {StatusCode}, {ErrorContent}",
                    response.StatusCode, responseContent);

                // פרש שגיאות נפוצות
                if (responseContent.Contains("API_KEY_INVALID"))
                    return "מפתח API לא תקין";
                if (responseContent.Contains("PERMISSION_DENIED"))
                    return "אין הרשאה לשימוש ב-API";
                if (responseContent.Contains("QUOTA_EXCEEDED"))
                    return "חרגת מגבול השימוש ב-API";
                if (responseContent.Contains("INVALID_REQUEST"))
                    return "בקשה לא תקינה ל-API";

                return "שגיאה בניתוח התמונה עם Google Vision API";
            }

            return ParseGoogleVisionResponse(responseContent);
        }
        catch (TaskCanceledException ex)
        {
            _logger.LogError(ex, "Timeout in Google Vision API call");
            return "תם הזמן הקצוב לניתוח התמונה";
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "HTTP error in Google Vision API call: {Message}", ex.Message);
            return "שגיאת רשת בניתוח התמונה";
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error in AnalyzeImageWithGoogleVision");
            return "שגיאה בתהליך ניתוח התמונה";
        }
    }


    [HttpGet("test-vision")]
    public async Task<IActionResult> TestGoogleVision()
    {
        try
        {
            var testImageUrl = "https://www.laroche-posay.co.il/-/media/project/loreal/brand-sites/lrp/emea/il/simple-page/landing-page/skin-check/skin-check-banner-img-03-m.jpg";

            var result = await AnalyzeImageWithGoogleVision(testImageUrl);

            return Ok(new
            {
                testResult = result,
                apiKeyConfigured = !string.IsNullOrEmpty(_googleVisionApiKey),
                apiKeyLength = _googleVisionApiKey?.Length ?? 0
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message, stackTrace = ex.StackTrace });
        }
    }

    [HttpGet("check-config")]
    public IActionResult CheckConfiguration()
    {
        return Ok(new
        {
            GoogleVisionApiKey = new
            {
                Configured = !string.IsNullOrEmpty(_googleVisionApiKey),
                Length = _googleVisionApiKey?.Length ?? 0,
                FirstChars = _googleVisionApiKey?.Substring(0, Math.Min(10, _googleVisionApiKey?.Length ?? 0)) ?? "N/A"
            },
            OpenAiApiKey = new
            {
                Configured = !string.IsNullOrEmpty(_openAiApiKey),
                Length = _openAiApiKey?.Length ?? 0
            },
            Urls = new
            {
                GoogleVisionBase = _googleVisionBaseUrl,
                OpenAiBase = _openAiBaseUrl
            }
        });
    }
    private async Task<bool> IsImageAccessible(string imageUrl)
    {
        try
        {
            using var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync(imageUrl);
            _logger.LogInformation("Image accessibility check - Status: {StatusCode}, ContentType: {ContentType}",
                response.StatusCode, response.Content.Headers.ContentType);
            return response.IsSuccessStatusCode;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Image accessibility check failed for URL: {ImageUrl}", imageUrl);
            return false;
        }
    }
    private string ParseGoogleVisionResponse(string jsonResponse)
    {
        try
        {
            using var jsonDocument = JsonDocument.Parse(jsonResponse);
            var responses = jsonDocument.RootElement.GetProperty("responses");

            if (responses.GetArrayLength() == 0)
                return "לא נמצאו תוצאות מניתוח התמונה";

            var firstResponse = responses[0];

            // Check for errors in the response
            if (firstResponse.TryGetProperty("error", out var error))
            {
                _logger.LogError("Google Vision API returned error: {Error}", error.ToString());
                return "שגיאה בניתוח התמונה";
            }

            var analysisResults = new List<string>();

            if (firstResponse.TryGetProperty("labelAnnotations", out var labels) && labels.GetArrayLength() > 0)
            {
                var labelList = new List<string>();
                foreach (var label in labels.EnumerateArray().Take(5))
                {
                    if (label.TryGetProperty("description", out var desc) &&
                        label.TryGetProperty("score", out var score))
                    {
                        labelList.Add($"{desc.GetString()} ({score.GetDouble():P1})");
                    }
                }
                if (labelList.Any())
                    analysisResults.Add($"זוהו האלמנטים הבאים: {string.Join(", ", labelList)}");
            }

            // Parse object annotations
            if (firstResponse.TryGetProperty("localizedObjectAnnotations", out var objects) && objects.GetArrayLength() > 0)
            {
                var objectList = new List<string>();
                foreach (var obj in objects.EnumerateArray().Take(3))
                {
                    if (obj.TryGetProperty("name", out var name) &&
                        obj.TryGetProperty("score", out var score))
                    {
                        objectList.Add($"{name.GetString()} ({score.GetDouble():P1})");
                    }
                }
                if (objectList.Any())
                    analysisResults.Add($"זוהו האובייקטים הבאים: {string.Join(", ", objectList)}");
            }

            return analysisResults.Any() ? string.Join(". ", analysisResults) :
                   "לא זוהו אלמנטים ספציפיים בתמונה";
        }
        catch (JsonException ex)
        {
            _logger.LogError(ex, "JSON parsing error in Google Vision response");
            return "שגיאה בפענוח תוצאות הניתוח";
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error parsing Google Vision response");
            return "שגיאה בפענוח תוצאות הניתוח";
        }
    }

    private async Task<string> GetMedicalAssessmentFromOpenAI(string visionResults)
    {
        try
        {
            using var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {_openAiApiKey}");
            client.Timeout = TimeSpan.FromSeconds(30);

            var requestData = new
            {
                model = "gpt-4",
                messages = new[]
                {
                    new
                    {
                        role = "system",
                        content = @"אתה רופא עור מומחה. קבל תיאור של תמונה מ-Google Vision API ותן הערכה רפואית לגבי האפשרות לסרטן עור.

אם בתיאור מופיעים מונחים או התייחסויות לגוף האדם, עור, בשר, כתמים או גידולים – תמיד החזר את התגובה  :  
                            'חשש כבד לסרטן עור - יש לפנות מיד לרופא עור'

                            אם בתיאור אין שום התייחסות או קשר לגוף האדם או לעור, החזר את התגובה :  
                            'אין חשש, התמונה אינה כוללת מידע עבור עור או כתמים'

                            חשוב: זוהי הערכה ניסיונית בלבד ואינה מהווה ייעוץ רפואי מקצועי ואינה מחליפה בדיקה רפואית.

"
        },
                    new
                    {
                        role = "user",
                        content = $"תיאור התמונה מ-Google Vision: {visionResults}"
                    }
                },
                max_tokens = 150,
                temperature = 0.3
            };

            var jsonContent = JsonSerializer.Serialize(requestData);
            var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            var response = await client.PostAsync(_openAiBaseUrl, content);

            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                _logger.LogError("OpenAI API Error: {StatusCode}, {ErrorContent}", response.StatusCode, errorContent);
                return "שגיאה בקבלת הערכה רפואית";
            }

            var jsonResponse = await response.Content.ReadAsStringAsync();
            return ParseOpenAIResponse(jsonResponse);
        }
        catch (TaskCanceledException ex) when (ex.InnerException is TimeoutException)
        {
            _logger.LogError(ex, "Timeout in OpenAI API call");
            return "תם הזמן הקצוב להערכה רפואית";
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "HTTP error in OpenAI API call");
            return "שגיאת רשת בהערכה רפואית";
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error in GetMedicalAssessmentFromOpenAI");
            return "שגיאה בתהליך ההערכה הרפואית";
        }
    }

    private string ParseOpenAIResponse(string jsonResponse)
    {
        try
        {
            using var jsonDocument = JsonDocument.Parse(jsonResponse);

            if (jsonDocument.RootElement.TryGetProperty("choices", out var choices) &&
                choices.GetArrayLength() > 0)
            {
                var firstChoice = choices[0];
                if (firstChoice.TryGetProperty("message", out var message) &&
                    message.TryGetProperty("content", out var content))
                {
                    var result = content.GetString()?.Trim();
                    return !string.IsNullOrEmpty(result) ? result : "לא התקבלה תשובה מהמערכת";
                }
            }

            // Check for API errors
            if (jsonDocument.RootElement.TryGetProperty("error", out var error))
            {
                _logger.LogError("OpenAI API returned error: {Error}", error.ToString());
                return "שגיאה בקבלת הערכה רפואית";
            }

            return "שגיאה בפענוח התשובה מהמערכת";
        }
        catch (JsonException ex)
        {
            _logger.LogError(ex, "JSON parsing error in OpenAI response");
            return "שגיאה בעיבוד התשובה";
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error parsing OpenAI response");
            return "שגיאה בעיבוד התשובה";
        }
    }
}
