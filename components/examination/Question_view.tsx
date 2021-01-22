import React from "react"
import {QuestionInterface} from "../../model/examination/question"
import AnswerArea from './answer_area/Answer_area';


export default function Question_view({
    question,
  }: {
    question: QuestionInterface;
  }) {

    return (
        <>
        {question.hasOwnProperty('fig_url') && <img src={question.fig_url} />}
        <h1>{question.questionText}</h1>
        <AnswerArea question={question} onChange={console.log}/>
        </>
    )
}