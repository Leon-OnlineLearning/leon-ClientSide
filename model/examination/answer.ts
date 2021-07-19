import { QuestionInterface, Q_type } from "./question";


export class TextAnswer{
    public questionType : Q_type;
    public questionId: String;
    public solutionText?: string;
    public solutionChoices?: String[];
    constructor(question : QuestionInterface,answerText: string|String[]){
        this.questionId = question.id;
        this.questionType = question.questionType;
        if (typeof answerText === 'string'){
            this.solutionText = answerText;
        }
        else {
            this.solutionChoices = answerText;
        }
        console.log(typeof answerText);
    }

    public toJson(){
        return {
            questionId: this.questionId,
            solutionText: this.solutionText,
            solutionChoices: this.solutionChoices
        }
    }


}