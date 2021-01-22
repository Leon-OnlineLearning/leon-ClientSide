export enum Q_type {
    MultiChoice,
    SingleChoice,
    ShortAnswer,
    LongAnswer,
    Image,
    Code,
}

export interface QuestionInterface {
    questionId: number;
    questionType: Q_type;
    questionText: string; 
    fig_url?: string; // figure image related to question
    choices?: string[]; // only used for Q_type.[multi|single]-choice types
    code_lang?: string; // only used for Q_type.code specifying the highlight language
}
