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
        courseId: string,
        professorId: string,
        duration: number,
        description?: string,
        id?,
    ) {
        super(title, description,
            type, id, startTime, endTime,
            courseId, professorId,duration);
        this.questions = questions;
        this.mark = mark;
    }

    static fromJSON(exam: Exam) {
        return new Exam(exam.title, exam.questions, exam.mark,
            exam.type, exam.startTime, exam.endTime,
            exam.courseId, exam.professorId,exam.duration,
            exam.description, exam.id);
    }
}