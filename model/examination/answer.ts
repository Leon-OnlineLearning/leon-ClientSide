import { Q_type } from "./question";

export interface AnswerInterface {
    questionType : Q_type,
    answerText? : String[] | String,
}