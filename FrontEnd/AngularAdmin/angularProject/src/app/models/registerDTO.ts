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


export interface RegisterPostModel {
    UserId?: number; // הוסף את זה
    UserName: string;
    UserEmail: string;
    UserEncryptedPassword: string;
    UserRole: string;
    UserPhone?: string;
    UserAddress?: string;
    UserBirth?: Date;
    UserCreateDate?: Date;
  }