using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Core.Models
{
    public class TestResualt
    {
        [Key]
        public int TestId  { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }
        public DateTime TestDate { get; set; }
        [MaxLength(1000)]
        public string ImgURL {  get; set; }
        [MaxLength(1000)]
        public string Summary { get; set; }

        public TestResualt(int testId, int userId, DateTime testDate, string imgURL, string summary)
        {
            TestId = testId;
            UserId = userId;
            TestDate = testDate;
            ImgURL = imgURL;
            Summary = summary;
        }

        public TestResualt(int userId, DateTime testDate, string imgURL, string summary)
        {
            UserId = userId;
            TestDate = testDate;
            ImgURL = imgURL;
            Summary = summary;
        }
    }
}