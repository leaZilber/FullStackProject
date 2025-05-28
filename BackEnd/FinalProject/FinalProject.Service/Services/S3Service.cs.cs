using Microsoft.Extensions.Configuration;
using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using Amazon.S3.Model;
using Amazon.Runtime;
using System;
using System.IO;
using System.Threading.Tasks;
using System.Net;

public class S3Service
{
    private readonly string _accessKey;
    private readonly string _secretKey;
    private readonly string _region;
    private readonly string _bucketName;
    private readonly IConfiguration _configuration;

    public S3Service(IConfiguration configuration)
    {
        _configuration = configuration;

        _accessKey = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY") ??
            throw new ArgumentNullException("AWS_ACCESS_KEY", "AWS_ACCESS_KEY configuration is missing");
        _secretKey = Environment.GetEnvironmentVariable("AWS_SECRET_KEY") ??
            throw new ArgumentNullException("AWS_SECRET_KEY", "AWS_SECRET_KEY configuration is missing");
        _region = Environment.GetEnvironmentVariable("AWS_REGION") ??
            throw new ArgumentNullException("AWS_REGION", "AWS_REGION configuration is missing");
        _bucketName = Environment.GetEnvironmentVariable("AWS_BUCKET_NAME") ??
            throw new ArgumentNullException("AWS_BUCKET_NAME", "AWS_BUCKET_NAME configuration is missing");
    }

 
    //    public async Task<string> UploadAsync(Stream fileStream, string fileName, string contentType)
    //{
    //    // Validate inputs
    //    if (fileStream == null)
    //        throw new ArgumentNullException(nameof(fileStream));
    //    if (string.IsNullOrEmpty(fileName))
    //        throw new ArgumentException("File name cannot be null or empty", nameof(fileName));

    //    // קרא את כל הנתונים לזיכרון כדי למנוע בעיות Disposal
    //    byte[] fileBytes;
    //    try
    //    {
    //        using (var memoryStream = new MemoryStream())
    //        {
    //            await fileStream.CopyToAsync(memoryStream);
    //    fileBytes = memoryStream.ToArray();
    //        }
    //Console.WriteLine($"File loaded to memory. Size: {fileBytes.Length} bytes");
    //    }
    //    catch (Exception ex)
    //    {
    //        Console.WriteLine($"Error reading file stream: {ex.Message}");
    //throw new Exception($"Failed to read file stream: {ex.Message}", ex);
    //    }

    //    var credentials = new BasicAWSCredentials(_accessKey, _secretKey);
    //var config = new AmazonS3Config
    //{
    //    RegionEndpoint = RegionEndpoint.GetBySystemName(_region),
    //    Timeout = TimeSpan.FromMinutes(3),
    //    //ReadWriteTimeout = TimeSpan.FromMinutes(3),
    //    MaxErrorRetry = 3
    //};

    //try
    //{
    //    Console.WriteLine($"Attempting to upload file: {fileName} to bucket: {_bucketName} in region: {_region}");
    //    Console.WriteLine($"File size: {fileBytes.Length} bytes");
    //    Console.WriteLine($"Content type: {contentType}");

    //    using var client = new AmazonS3Client(credentials, config);

    //    // בדיקה אם ה-bucket קיים ונגיש
    //    try
    //    {
    //        await client.GetBucketLocationAsync(_bucketName);
    //        Console.WriteLine("Bucket is accessible");
    //    }
    //    catch (Exception bucketEx)
    //    {
    //        Console.WriteLine($"Bucket access test failed: {bucketEx.Message}");
    //        throw new Exception($"Cannot access S3 bucket '{_bucketName}': {bucketEx.Message}", bucketEx);
    //    }

    //    // שימוש ב-MemoryStream חדש עם הבייטים
    //    using (var uploadStream = new MemoryStream(fileBytes))
    //    {
    //        var putRequest = new PutObjectRequest
    //        {
    //            BucketName = _bucketName,
    //            Key = fileName,
    //            InputStream = uploadStream,
    //            ContentType = contentType,
    //            //CannedACL = S3CannedACL.PublicRead,
    //            ServerSideEncryptionMethod = ServerSideEncryptionMethod.None
    //        };

    //        var response = await client.PutObjectAsync(putRequest);
    //        Console.WriteLine($"Upload successful. ETag: {response.ETag}");
    //    }

    //    // Generate public URL
    //    string publicUrl = $"https://{_bucketName}.s3.{_region}.amazonaws.com/{fileName}";

    //    // בדוק שהקובץ באמת הועלה
    //    try
    //    {
    //        var headRequest = new GetObjectMetadataRequest
    //        {
    //            BucketName = _bucketName,
    //            Key = fileName
    //        };
    //        var metadata = await client.GetObjectMetadataAsync(headRequest);
    //        Console.WriteLine($"File verified on S3. Size: {metadata.ContentLength}, LastModified: {metadata.LastModified}");
    //    }
    //    catch (Exception verifyEx)
    //    {
    //        Console.WriteLine($"Warning: Could not verify file upload: {verifyEx.Message}");
    //    }

    //    return publicUrl;
    //}
    //catch (AmazonS3Exception s3Ex)
    //{
    //    Console.WriteLine($"S3 specific error: {s3Ex.ErrorCode} - {s3Ex.Message}");
    //    Console.WriteLine($"Request ID: {s3Ex.RequestId}");
    //    Console.WriteLine($"Status Code: {s3Ex.StatusCode}");

    //    string errorMessage = s3Ex.ErrorCode switch
    //    {
    //        "InvalidAccessKeyId" => "AWS Access Key is invalid",
    //        "SignatureDoesNotMatch" => "AWS Secret Key is invalid",
    //        "AccessDenied" => "Access denied - check bucket permissions",
    //        "NoSuchBucket" => $"Bucket '{_bucketName}' does not exist",
    //        "BucketAlreadyOwnedByYou" => "Bucket exists but check region configuration",
    //        _ => $"S3 Error: {s3Ex.ErrorCode} - {s3Ex.Message}"
    //    };

    //    throw new Exception(errorMessage, s3Ex);
    //}
    //catch (AmazonServiceException awsEx)
    //{
    //    Console.WriteLine($"AWS Service error: {awsEx.ErrorCode} - {awsEx.Message}");
    //    throw new Exception($"AWS Service Error: {awsEx.Message}", awsEx);
    //}
    //catch (Exception ex)
    //{
    //    Console.WriteLine($"Unexpected error uploading to S3: {ex.Message}");
    //    Console.WriteLine($"Stack trace: {ex.StackTrace}");
    //    Console.WriteLine($"Inner exception: {ex.InnerException?.Message}");

    //    throw new Exception($"S3 Upload failed: {ex.Message}", ex);
    //}
    //}
    public async Task<string> UploadAsync(string fileName, Stream uploadStream, string contentType)
    {
        var config = new AmazonS3Config
        {
            RegionEndpoint = RegionEndpoint.USEast1, // שנה אם צריך
            ForcePathStyle = true // חובה עבור MinIO או אם את משתמשת ב-localstack
        };

        var credentials = new BasicAWSCredentials(_accessKey, _secretKey);
        var client = new AmazonS3Client(credentials, config);

        var putRequest = new PutObjectRequest
        {
            BucketName = _bucketName,
            Key = fileName,
            InputStream = uploadStream,
            ContentType = contentType,
            //CannedACL = S3CannedACL.PublicRead, // אם את רוצה שהקובץ יהיה נגיש לציבור
            ServerSideEncryptionMethod = ServerSideEncryptionMethod.None
        };

        var response = await client.PutObjectAsync(putRequest);
        //return $"https://{_bucketName}.s3.amazonaws.com/{fileName}";
        return $"https://s3.{_region}.amazonaws.com/{_bucketName}/{fileName}";
    }


    public async Task<bool> DeleteAsync(string fileName)
    {
        var credentials = new BasicAWSCredentials(_accessKey, _secretKey);
        var config = new AmazonS3Config
        {
            RegionEndpoint = RegionEndpoint.GetBySystemName(_region),
            Timeout = TimeSpan.FromMinutes(2),
            MaxErrorRetry = 2
        };

        try
        {
            using var client = new AmazonS3Client(credentials, config);
            var deleteRequest = new DeleteObjectRequest
            {
                BucketName = _bucketName,
                Key = fileName
            };

            await client.DeleteObjectAsync(deleteRequest);
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error deleting from S3: {ex.Message}");
            return false;
        }
    }
}