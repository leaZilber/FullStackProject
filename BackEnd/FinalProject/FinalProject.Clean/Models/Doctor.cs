using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Core.Models
{
    public class Doctor
    {
        [Key]
        public int DoctorId { get; set; }
        public string DoctorName { get; set; }
        public string FieldOfSpecialization { get; set; }
        public int LicenseNumber { get; set; }

        public Doctor(int doctorId, string doctorName, string fieldOfSpecialization, int licenseNumber)
        {
            DoctorId = doctorId;
            DoctorName = doctorName;
            FieldOfSpecialization = fieldOfSpecialization;
            LicenseNumber = licenseNumber;
        }

        public Doctor(string doctorName, string fieldOfSpecialization, int licenseNumber)
        {
            DoctorName = doctorName;
            FieldOfSpecialization = fieldOfSpecialization;
            LicenseNumber = licenseNumber;
        }
    }
}
