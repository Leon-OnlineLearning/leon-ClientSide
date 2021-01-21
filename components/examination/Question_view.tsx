import React from "react"
import {QuestionInterface,Q_type} from "../../model/examination/question"
import MultiChoice from "./answer_area/multi_choice"

function AnswerArea({question}:{question:QuestionInterface}){
    switch (question.questionType) {
        case Q_type.MultiChoice:
            return <MultiChoice question={question} onChange={console.log}/>
        case Q_type.ShortAnswer:
            return <input type="text" />
        default:
            <p>invalid answer type </p>
    }
}
export default function Question_view({
    question,
  }: {
    question: QuestionInterface;
  }) {

    return (
        <>
        {question.hasOwnProperty('fig_url') && <img src={question.fig_url} />}
        <h1>{question.questionText}</h1>
        <AnswerArea question={question} />
        </>
    )
}