import User from "./User";

export default class Student extends User {
  constructor(firstName: string, lastName: string, email: string, private _year: string, id?: string) {
    super(firstName, lastName, email, "student", id ?? id);
  }

  get year(): string {
    return this._year;
  }
}
