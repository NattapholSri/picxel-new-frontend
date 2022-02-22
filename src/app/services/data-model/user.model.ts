export interface UserDetails {
    _id?: string;
    username?: string;
    email?: string;
    password?: string;
    gender?: string;
    profile_pic?: string;
    firstname?: string;
  }
  
  export class UserLogin {
    _id?: string;
    username?: string;
    email?: string;
    password!: string;
    exp?: string;
  }
  
  export class UserRegistration {
    _id?: string;
    username!: string;
    email!: string;
    password!: string;
    mailotp?: string;
  }
  
  export interface JsonMail {
    email: string;
  }