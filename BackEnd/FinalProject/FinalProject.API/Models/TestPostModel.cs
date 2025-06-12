using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FinalProject.API.Models
{
    public class TestPostModel
    {
        public int UserId { get; set; }
        public DateTime TestDate { get; set; }
        public string ImgURL { get; set; }
        public string Summary { get; set; }

        public TestPostModel(int userId, DateTime testDate, string imgURL, string summary)
        {
            UserId = userId;
            TestDate = testDate;
            ImgURL = imgURL;
            Summary = summary;
        }
    }
}
