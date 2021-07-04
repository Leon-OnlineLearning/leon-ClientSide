import User from "./User";
import Course from "../course/Course";
import {UserRole} from './User'


export default class Professor extends User {
  constructor(firstName: string, lastName: string, email: string, private _courses: [Course], id?: string) {
    super(firstName, lastName, email, "professor", id ?? id);
  }

  get courses(): [Course] {
    return this._courses;
  }
}
