// export class RegisterPostModel {
//     constructor(
//         public id?: number,
//         public UserName: string = "",
//         public UserEmail: string = "",
//         public UserEncryptedPassword: string = "",
//         public UserRole: string = 'Admin',
//         public UserPhone: string = "",
//         public UserAddress: string = "",
//         public UserBirth: Date = new Date(),
//         public UserCreateDate: Date = new Date()
//     ) { }
// }

export class RegisterPostModel {
    constructor(
      public userId?: number,
      public userName: string = '',
      public userEmail: string = '',
      public userEncryptedPassword: string = '',
      public userRole: string = 'user',
      public userPhone?: string,
      public userAddress?: string,
      public userBirth?: Date,
      public userCreateDate?: Date
    ) {}
  }
  