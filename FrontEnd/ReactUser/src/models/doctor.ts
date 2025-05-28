export class Doctor {
  DoctorId?: number
  DoctorName = ""
  FieldOfSpecialization = ""
  LicenseNumber = 0


  constructor(data: any = {}) {
    this.DoctorId = data.DoctorId !== undefined ? Number(data.DoctorId) : undefined
    this.DoctorName = data.DoctorName || ""
    this.FieldOfSpecialization = data.FieldOfSpecialization || ""
    this.LicenseNumber = data.LicenseNumber || 0
  }
}


export class DoctorPost {
  DoctorName = ""
  FieldOfSpecialization = ""
  LicenseNumber = 0

  constructor(data: any = {}) {
    this.DoctorName = data.DoctorName || ""
    this.FieldOfSpecialization = data.FieldOfSpecialization || ""
    this.LicenseNumber = data.LicenseNumber || 0
  }
}
