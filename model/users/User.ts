export enum UserRole {
    Student="student",
    Professor="Professor",
    admin="admin"
}


export default class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password?: string,
    public id?: string,
    public role? :UserRole
  ) {}
  get name (){
    return this.firstName+this.lastName
  }
}

