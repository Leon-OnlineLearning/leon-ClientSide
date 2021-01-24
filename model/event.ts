export enum EventType {
    ASSIGNMENT = "Assignment",
    QUIZ = "Quiz",
    LECTURE = "Lecture",
    TEST = "Test"
}

export type EventRepresentation = {
    title: string,
    description: string,
    startDate: Date,
    type: EventType,
    endDate: Date,
    id: string
}

export class Event {
    private _startDate: Date;
    private _endDate: Date;

    public get endDate(): Date {
        return this._endDate;
    }
    public set endDate(value: Date) {
        this._endDate = value;
    }
    public get startDate(): Date {
        return this._startDate;
    }
    public set startDate(value: Date) {
        this._startDate = value;
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
    constructor(private _title: string, private _description: string, public type: EventType, public id, startDate: Date, endDate: Date) {
        console.log(startDate, endDate)
        if (endDate <= startDate) {
            throw new Error("End date must be after start date");
        }
        this.startDate = startDate;
        this.endDate = endDate;
    }
    static fromJSON({
        title,
        description,
        startDate,
        type,
        endDate,
        id,
    }: EventRepresentation) {
        return new Event(title, description, type, id, startDate, endDate)
    }

}