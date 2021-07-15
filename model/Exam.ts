import { Event, EventType } from "./event";
import { QuestionInterface } from "./examination/question";


type exam_types = EventType.ASSIGNMENT | EventType.QUIZ | EventType.TEST
export class Exam extends Event {
    public questions: QuestionInterface[];
    public mark;
    public type: exam_types

    constructor(title: string,
        questions: QuestionInterface[],
        mark: number,
        type: exam_types,
        startTime: Date,
        endTime: Date,
        description?: string,
        id?,
    ) {
        super(title, description, type, id, startTime, endTime)
        this.questions = questions;
        this.mark = mark;
    }

    static fromJSON({
        id,
        title,
        description,
        type,
        startTime,
        endTime,
        questions,
        mark }: Exam) {
        return new Exam(title, questions, mark,
            type, startTime, endTime, description, id);
    }
}