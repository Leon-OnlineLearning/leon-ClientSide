import { QuestionInterface, Q_type } from "./question";

export interface AnswerInterface {
    questionType : Q_type,
    answerText? : String[] | String,
}

export class TextAnswer implements AnswerInterface{
    public questionType : Q_type;
    public answerText: String
    constructor(question : QuestionInterface,answerText: String){
        this.questionType = question.questionType;
        this.answerText = answerText;
    }
}