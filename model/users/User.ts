export default class User {
  constructor(
    private _firstName: string,
    private _lastName: string,
    private email: string,
    private _id?: number
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


  public get id(): number {
    return this._id;
  }
}

