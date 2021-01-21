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
    questionText : "question text needs short answer",
    questionType : Q_type.ShortAnswer
}
export const short_answer = Template.bind({})
short_answer.args = {
    question: example_short_answer
}
