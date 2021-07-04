
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import CreateQuestion from "../../components/examination/create_exam/create_question";
import QuestionContainer from "../../components/examination/create_exam/ExamContainer";
import { ProfessorDashboard, ProfessorDashboardSelectedPage } from "../../components/professor/dashboard/professor-dashboard";
import { QuestionInterface, Q_type } from "../../model/examination/question";







const emptyQuestionTemplate: QuestionInterface = {
    questionType: Q_type.MultiChoice,
}


export default function createExam() {

    const [questions, setQuestions] = useState<QuestionInterface[]>([emptyQuestionTemplate])

    function setQuestionByIndex(index: number) {
        return ((callBack) => {
            setQuestions(questionList => {
                let newQuestionList = [...questionList]
                newQuestionList[index] = callBack(questionList[index])
                return newQuestionList
            })
        })
    }

    function deleteQuestionByIndex(index: number) {
        return (() => {
            setQuestions(questionList => (
                questionList.slice(0, index).concat(questionList.slice(index + 1))
            )

            )
        })
    }

    function addQuestion() {
        setQuestions(questions => questions.concat(emptyQuestionTemplate))
        console.log(emptyQuestionTemplate)
    }


    // TODO add apility to remove question
    return (
        <>
            <ProfessorDashboard selectedPage={ProfessorDashboardSelectedPage.exams}>
                <div className="m-5">
                    <h1> creating exam </h1>
                    {questions.map((question, index) => (
                        <QuestionContainer
                            key={['question', index].join('_')}
                            question={question}
                            updateQuestion={setQuestionByIndex(index)}
                            index={index}
                            deleteQuestion={deleteQuestionByIndex(index)}
                        />
                    )
                    )}
                    <Button onClick={addQuestion}>add question</Button>

                </div>
            </ProfessorDashboard>

        </>
    )
}