import { QuestionInterface, Q_type } from "./question";

export interface AnswerInterface {
    questionType : Q_type,
    answerText? : String[] | String,
}

export class TextAnswer implements AnswerInterface{
    public questionType : Q_type;
    constructor(question : QuestionInterface,public answerText: String){
        this.questionType = question.questionType
    }
}