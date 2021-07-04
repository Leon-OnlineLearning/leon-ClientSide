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
    private _startTime: Date;
    private _endTime: Date;

    public get endTime(): Date {
        return this._endTime;
    }
    public set endTime(value: Date) {
        this._endTime = value;
    }
    public get startTime(): Date {
        return this._startTime;
    }
    public set startTime(value: Date) {
        this._startTime = value;
    }
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }
    constructor(private _title: string, private _description: string, public type: EventType, public id, startTime: Date, endTime: Date) {
        console.log(startTime, endTime)
        if (endTime <= startTime) {
            throw new Error("End date must be after start date");
        }
        this.startTime = startTime;
        this.endTime = endTime;
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