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
    id: string
}

export class Event {
    constructor(public title: string, public description: string,
        public type: EventType, public id,
        public startTime: Date, public endTime: Date) {
        console.debug(startTime, endTime)
        if (endTime <= startTime) {
            throw new Error("End date must be after start date");
        }
    }
    static fromJSON({
        title,
        description,
        startTime: startTime,
        type,
        endTime: endDate,
        id,
    }: EventRepresentation) {
        return new Event(title, description, type, id, startTime, endDate)
    }

}