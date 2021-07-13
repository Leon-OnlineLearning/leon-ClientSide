import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { QuestionInterface, Q_type } from "../../../../model/examination/question"
import QuestionContainer from "../questionContainer"
import noSsr from "../../../utilComponents/noSSR"
import { Exam } from "../../../../model/Exam"

const emptyQuestionTemplate: QuestionInterface = {
    questionType: Q_type.MultiChoice,
}



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



    function handleSubmit(event) {
        const form = event.currentTarget as HTMLFormElement;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        event.preventDefault();

        const json2send = { "questions": questions }


        const fd = new FormData(form)
        const pairs = [...fd.entries()]
        pairs.forEach((v) => {
            json2send[v[0]] = v[1];
        })

        console.debug(json2send)
        // TODO validate date is not in past
        // setValidated(true);
        
        // validateTitle(title)
        
        
        // TODO constract exam and submit it
        // createExam(questions)
    }
    // TODO add ability to remove question
    return (
        <>
            <div className="m-5">
                <h1> creating exam </h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="validationCustom03">
                        <Form.Label>exam title</Form.Label>
                        <Form.Control
                            name="title"
                            required
                            placeholder="descriptive name of exam" />
                    </Form.Group>
                    <Form.Group controlId="validationCustom03">
                        <Form.Label>exam_mark</Form.Label>
                        <Form.Control name="mark"
                            required
                            type="number"
                            placeholder="100"
                            defaultValue="100"
                            min="0"
                            max="1000" />
                    </Form.Group>

                    <Form.Group controlId="validationCustom03">
                        <Form.Label>start time</Form.Label>
                        <Form.Control name="startTime"
                            required
                            type="datetime-local"

                        />
                    </Form.Group>

                    <Form.Group controlId="validationCustom03">
                        <Form.Label>end time</Form.Label>
                        <Form.Control name="endTime" required type="datetime-local" />
                    </Form.Group>


                    {/* {time_input_client} */}

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


