import React, { FormEvent, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { QuestionInterface, Q_type } from "../../../../model/examination/question"
import QuestionContainer from "../questionContainer"
import { Exam } from "../../../../model/Exam"
import { createExam } from "../../../../controller/exam/exam"
import { validate_end_time } from "./form_validation"
import dynamic from "next/dynamic"

const emptyQuestionTemplate: QuestionInterface = {
    questionType: Q_type.MultiChoice,
}

// IMPORTANT NOTE if not loaded as server side time will conflict in client and server.
const Start_end_time = dynamic(() => import("./start_end_time"), {
    ssr: false
})


export default function ExamForm(props) {

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



    function handleSubmit(event: FormEvent) {
        const form = event.currentTarget as HTMLFormElement;
        form.checkValidity()
        event.preventDefault();
        event.stopPropagation();

        let exam_data: Exam;
        exam_data = {} as Exam;
        exam_data["questions"] = questions

        const fd = new FormData(form)
        const pairs = [...fd.entries()]
        pairs.forEach((v) => {
            exam_data[v[0]] = v[1];
        })


        console.debug(exam_data)
        // check validation
        let isValid = true;
        try {
            exam_data = Exam.fromJSON(exam_data as Exam)
        } catch (error) {
            console.log(error)
            console.debug("exam not valid")
            console.debug(exam_data)
            isValid = false
        }

        // submit to server
        if (isValid) {
            createExam(exam_data)
        }
    }

    return (
        <>
            <div className="m-5">
                <h1> creating exam </h1>
                <Form onSubmit={handleSubmit} name="examForm">
                    <Form.Group >
                        <Form.Label>exam title</Form.Label>
                        <Form.Control
                            name="title"
                            required
                            placeholder="descriptive name of exam"
                            minLength={5}
                        />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>exam_mark</Form.Label>
                        <Form.Control name="mark"
                            required
                            type="number"
                            placeholder="100"
                            defaultValue="100"
                            min="0"
                            max="1000" />
                    </Form.Group>

                    {/* NOTE current year is chosen automatically
                    until something else is requested */}
                    {/* REVIEW what is year why not get it from start date */}
                    {/* <Form.Group >
                        <Form.Label>year</Form.Label>
                        <Form.Control name="year"
                            required
                            type="number"
                            defaultValue={new Date().getFullYear()}
                            min={new Date().getFullYear()}
                            max={new Date().getFullYear()}
                        />
                    </Form.Group> */}


                    <Start_end_time />

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
                    {/* <div className="justify-content-between d-flex"> */}

                    <Button onClick={addQuestion}>add question</Button>
                    <hr></hr>
                    <div className="d-flex justify-content-end">
                        <Button type="submit" className="btn-success btn-lg mb-3">save</Button>
                    </div>
                    {/* </div> */}

                </Form>
            </div>

        </>
    )
}
