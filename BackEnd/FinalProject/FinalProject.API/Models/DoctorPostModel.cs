namespace FinalProject.API.Models
{
    public class DoctorPostModel
    {
        //public int ScheduleId { get; set; }
        public string DoctorName { get; set; }
        public string FieldOfSpecialization { get; set; }
        public int LicenseNumber { get; set; }
        public DoctorPostModel(string doctorName, string fieldOfSpecialization, int lLicenseNumber)
        {
            DoctorName = doctorName;
            FieldOfSpecialization = fieldOfSpecialization;
            LicenseNumber = lLicenseNumber;
        }
    }
}