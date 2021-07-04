import React from "react"
import { AnswerInterface } from "../../model/examination/answer";
import {QuestionInterface} from "../../model/examination/question"
import AnswerArea from './answer_area/Answer_area';


export default function Question_view({
    question,onChange
  }: {
    question: QuestionInterface;
    onChange(answer: AnswerInterface): void
  }) {

    return (
        <div className="my-3 p-2 border rounded border-secondary">
        {question.hasOwnProperty('fig_url') && <img src={question.fig_url} />}
        <h3>{question.questionText}</h3>
        <AnswerArea question={question} onChange={onChange}/>
        </div>
    )
}