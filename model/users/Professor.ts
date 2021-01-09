import User from "./User";
import Course from "../course/Course";

export default class Professor extends User {
  constructor(id: number, name: string, private _courses: [Course]) {
    super(name, id);
  }

  get courses() : [Course] {
    return this._courses;
  }
}
