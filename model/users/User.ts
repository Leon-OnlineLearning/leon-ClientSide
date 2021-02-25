export default abstract class User {
  constructor(
    private _firstName: string,
    private _lastName: string,
    private _email: string,
    private _role: string,
    private _id?: string,
  ) {}

  public get firstName(): string {
    return this._firstName;
  }

  public set firstName(v: string) {
    this._firstName = v;
  }

  public get lastName() {
    return this._lastName;
  }

  public set lastName(v: string) {
    this._lastName = v;
  }

  public get email() : string {
    return this._email
  }

  public get id(): string {
    return this._id;
  }

  
  public get role() : string {
    return this._role
  }
  
}

