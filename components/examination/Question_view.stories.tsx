/**
 * this file is only for development and used to test components
 * it will not be packed or have any further use
 */


import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';


import { QuestionInterface, Q_type } from '../../model/examination/question';
import Question_view from './Question_view';
import { example_multi_question, example_short_answer, example_LongAnswer, example_code, example_single_choice, example_image } from './question.sample';

export default {
    title: 'examination/questions/view',
    component: Question_view,
}



const Template = (args) => <Question_view {...args} />;

export const multi_choice = Template.bind({})
multi_choice.args = {
    question: example_multi_question
}



export const short_answer = Template.bind({})
short_answer.args = {
    question: example_short_answer
}

export const long_answer = Template.bind({})
long_answer.args = {
    question: example_LongAnswer
}

export const code_answer = Template.bind({})
code_answer.args = {
    question: example_code
}


export const single_choice = Template.bind({})
single_choice.args = {
    question: example_single_choice
}


export const image_answer = Template.bind({})
image_answer.args = {
    question: example_image
}
