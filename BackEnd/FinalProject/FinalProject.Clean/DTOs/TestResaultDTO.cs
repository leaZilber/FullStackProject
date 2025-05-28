using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Core.DTOs
{
    public class TestResaultDTO
    {
        public int TestId{ get; set; }
        public DateTime TestDate { get; set; }
        public string ImgURL { get; set; }
        public string Summary { get; set; }
    }
}
