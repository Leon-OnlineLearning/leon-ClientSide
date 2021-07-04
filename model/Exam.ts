import { Event } from "./event";
import { QuestionInterface } from "./examination/question";

export class Exam extends Event {
    public questions : QuestionInterface[];
    public mark;
}