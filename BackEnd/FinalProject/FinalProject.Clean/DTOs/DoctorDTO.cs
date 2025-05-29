using FinalProject.Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Core.DTOs
{
    public class DoctorDTO
    {
        public int DoctorId { get; set; }
        public string DoctorName { get; set; }
        public string FieldOfSpecialization { get; set; }
        public int LicenseNumber { get; set; }

        public DoctorDTO(int doctorId, string doctorName, string fieldOfSpecialization, int licenseNumber)
        {
            DoctorId = doctorId;
            DoctorName = doctorName;
            FieldOfSpecialization = fieldOfSpecialization;
            LicenseNumber = licenseNumber;
        }

      
    }
}
