import User from "./User";

export default class Student extends User {
  constructor(id: number, name: string, private _year: string) {
    super(name, id);
  }

  get year() : string {
    return this._year;
  }
}
