/**
 * this file is only for development and used to test components
 * it will not be packed or have any further use
 */
import React, { useState } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { QuestionInterface, Q_type } from '../../../model/examination/question';
import { example_code, example_image, example_LongAnswer, example_multi_question, example_short_answer, example_single_choice } from '../question.sample';
import CreateQuestion from './create_question';

export default {
    title: 'examination/questions/create',
    component: CreateQuestion,
}



const Template = ({sample_question}) => {
    const [exampleQuestion, setExampleQuestion] = useState(sample_question)
   const update = old => setExampleQuestion(old)
    
    return <>
        <CreateQuestion question={exampleQuestion} updateQuestion={update} />
    </>
};

export const multi_choice = () => <Template sample_question={example_multi_question} />

export const short_answer = () => <Template sample_question={example_short_answer} />

export const long_answer = () => <Template sample_question={example_LongAnswer} />

export const code_answer = () => <Template sample_question={example_code} />


export const single_choice = () => <Template sample_question={example_single_choice} />


export const image_answer = () => <Template sample_question={example_image} />

