using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FinalProject.API.Models
{
    public class TestPostModel
    {
        [ForeignKey("User")]
        public int UserId { get; set; }
        public DateTime TestDate { get; set; }
        [MaxLength(100)]
        public string ImgURL { get; set; }
        [MaxLength(250)]
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
