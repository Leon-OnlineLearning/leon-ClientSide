import { QuestionInterface, Q_type } from "../../model/examination/question"

export let example_multi_question :QuestionInterface= {
    questionText : "question text need to choose many",
    questionType : Q_type.MultiChoice,
    choices : [
        "choice one",
        "choice two",
        "choice three",
        "choice four"
    ]
    
}



export let example_short_answer :QuestionInterface= {
    
    questionText : "question text needs short answer",
    questionType : Q_type.ShortAnswer
}


export let example_LongAnswer :QuestionInterface= {
    
    questionText : "question text needs long answer",
    questionType : Q_type.LongAnswer
}


export let example_code :QuestionInterface= {
    
    questionText : "question text needs code as answer",
    questionType : Q_type.Code
}


export let example_single_choice :QuestionInterface= {
    
    questionText : "question text needs single choice ",
    questionType : Q_type.SingleChoice,
    choices : [
        "choice one",
        "choice two",
        "choice three",
        "choice four"
    ]
}


export let example_image :QuestionInterface= {
    
    questionText : "question text needs single choice ",
    questionType : Q_type.Image
}