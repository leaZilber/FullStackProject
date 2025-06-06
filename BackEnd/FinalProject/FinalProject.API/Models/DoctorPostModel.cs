namespace FinalProject.API.Models
{
    public class DoctorPostModel
    {
        public string DoctorName { get; set; }
        public string FieldOfSpecialization { get; set; }
        public int LicenseNumber { get; set; }
        public DoctorPostModel(string doctorName, string fieldOfSpecialization, int licenseNumber)
        {
            DoctorName = doctorName;
            FieldOfSpecialization = fieldOfSpecialization;
            LicenseNumber = licenseNumber;
        }
     
    }
}