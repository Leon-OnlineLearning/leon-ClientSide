export enum UserRole {
    Student,
    Professor,
    admin
}


export default class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public id?: string,
  ) {}
}

