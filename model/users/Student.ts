import User, { UserRole } from "./User";
import Course from "../course/Course";

export default class Student extends User {
  constructor(id: number, name: string, private _courses: [Course]) {
    super(name, id, UserRole.Student);
  }

  get courses() : [Course] {
    return this._courses;
  }
}
