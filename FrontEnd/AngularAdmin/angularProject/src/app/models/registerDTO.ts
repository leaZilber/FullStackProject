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
    UserId?: number; // הוסף את זה
    UserName: string;
    UserEmail: string;
    UserEncryptedPassword: string;
    UserRole: string;
    UserPhone?: string;
    UserAddress?: string;
    UserBirth?: Date;
    UserCreateDate?: Date;
    constructor(
        UserId?: number,
        UserName: string = "",
        UserEmail: string = "",
        UserEncryptedPassword: string = "",
        UserRole: string = 'user|Admin',
        UserPhone?: string,
        UserAddress?: string,
        UserBirth?: Date,
        UserCreateDate?: Date
    ) {
        this.UserId = UserId;
        this.UserName = UserName;
        this.UserEmail = UserEmail;
        this.UserEncryptedPassword = UserEncryptedPassword;
        this.UserRole = UserRole;
        this.UserPhone = UserPhone;
        this.UserAddress = UserAddress;
        this.UserBirth = UserBirth;
        this.UserCreateDate = UserCreateDate;
    }
  }