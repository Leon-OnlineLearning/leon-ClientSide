import User from "./User";
import Course from "../course/Course";
import {UserRole} from './User'


export default class Professor extends User {
  constructor(id: number, name: string, private _courses: [Course]) {
    super(name, id, UserRole.Professor);
  }

  get courses() : [Course] {
    return this._courses;
  }
}
