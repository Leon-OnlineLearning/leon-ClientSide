export enum EventType {
    ASSIGNMENT = "Assignment",
    QUIZ = "Quiz",
    LECTURE = "Lecture",
    TEST = "Test"
}

export type EventRepresentation = {
    title: string,
    description: string,
    startTime: Date,
    type: EventType,
    endTime: Date,
    id: string,
    courseId: string,
    professorId: string
    duration: number,
}

export class Event {
    constructor(public title: string, public description: string,
        public type: EventType, public id,
        public startTime: Date, public endTime: Date,
        public courseId: string,
        public professorId: string, public duration: number) {
        console.debug(startTime, endTime)
        if (endTime <= startTime) {
            throw new Error("End date must be after start date");
        }
    }
    static fromJSON(exam: EventRepresentation) {
        return new Event(exam.title, exam.description, exam.type, exam.id,
            exam.startTime, exam.endTime, exam.courseId, exam.professorId, exam.duration)
    }

}