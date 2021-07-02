import { Course } from "./course/Course";

export type Lecture = {
    title: string,
    startTime: Date,
    course: Course,
    id?: string
}