export class RegisterPostModel {
    constructor(
        public id?: number,
        public UserName: string = "",
        public UserEmail: string = "",
        public UserEncryptedPassword: string = "",
        public UserRole: string = 'Admin',
        public UserPhone: string = "",
        public UserAddress: string = "",
        public UserBirth: Date = new Date(),
        public UserCreateDate: Date = new Date()
    ) { }
}
