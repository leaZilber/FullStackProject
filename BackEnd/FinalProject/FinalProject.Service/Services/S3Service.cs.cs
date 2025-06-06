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