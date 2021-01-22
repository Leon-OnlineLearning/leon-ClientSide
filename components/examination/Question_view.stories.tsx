import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';


import { QuestionInterface, Q_type } from '../../model/examination/question';
import Question_view from './Question_view';

export default {
    title: 'examination/questions/multi_choice',
    component: Question_view,
  }


  
const Template = (args) => <Question_view {...args} />;
  
let example_multi_question :QuestionInterface= {
    questionId : 123,
    questionText : "question text need to choose many",
    questionType : Q_type.MultiChoice,
    choices : [
        "choice one",
        "choice two",
        "choice three",
        "choice four"
    ]
    
}
export const multi_choice = Template.bind({})
multi_choice.args = {
    question: example_multi_question
}



let example_short_answer :QuestionInterface= {
    questionId : 124,
    questionText : "question text needs short answer",
    questionType : Q_type.ShortAnswer
}
export const short_answer = Template.bind({})
short_answer.args = {
    question: example_short_answer
}

let example_LongAnswer :QuestionInterface= {
    questionId : 1241,
    questionText : "question text needs long answer",
    questionType : Q_type.LongAnswer
}
export const long_answer = Template.bind({})
long_answer.args = {
    question: example_LongAnswer
}

let example_code :QuestionInterface= {
    questionId : 1234,
    questionText : "question text needs code as answer",
    questionType : Q_type.Code
}
export const code_answer = Template.bind({})
code_answer.args = {
    question: example_code
}


let example_single_choice :QuestionInterface= {
    questionId : 1234,
    questionText : "question text needs single choice ",
    questionType : Q_type.SingleChoice,
    choices : [
        "choice one",
        "choice two",
        "choice three",
        "choice four"
    ]
}
export const single_choice = Template.bind({})
single_choice.args = {
    question: example_single_choice
}


let example_image :QuestionInterface= {
    questionId : 1234,
    questionText : "question text needs single choice ",
    questionType : Q_type.Image
}
export const image_answer = Template.bind({})
image_answer.args = {
    question: example_image
}

