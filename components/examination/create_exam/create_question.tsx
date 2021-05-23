import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form"
import { QuestionInterface, Q_type } from "../../../model/examination/question"
import CreateChoices from "./choices";



export default function CreateQuestion(props: { question: QuestionInterface, setQuestion: CallableFunction }) {

    
    const changeType = (newType) => (props.setQuestion(question => {
        // TODO remove adoptive area fields
        let newQuestion = {...question }
        newQuestion.questionType = newType
        return newQuestion
    }))


    const changeText = (newText) => (props.setQuestion(question => {
        // TODO remove adoptive area fields
        let newQuestion = {...question }
        newQuestion.questionText = newText
        return newQuestion
    }))

    // TODO add id for editing
    return <>
        <QuestionTypeSelection 
        question_type={props.question.questionType}
        onChange={changeType}
         />
        <QuestionText text={props.question.questionText} setText={changeText}/>
        <AdoptiveArea 
        selected_type={props.question.questionType} 
        setQuestion={props.setQuestion}/>
    </>


}



const QuestionTypeSelection = ({question_type,onChange}) => {
    const questionTypes = Object.values(Q_type);
    
    return (<>
    <Form.Group>
        <Form.Label>question type</Form.Label>
        <Form.Control as="select" 
        onChange={e => onChange(e.target.value as Q_type)} 
        value={question_type}>
            {questionTypes.map(type_name => <option key={type_name}>{type_name}</option>)}
        </Form.Control>
    </Form.Group>

</>)
}

const QuestionText = ({text,setText}) => (<>
    <Form.Group>
        <Form.Label>question text</Form.Label>
        <Form.Control as="textarea" placeholder="the question text" 
        value={text} 
        onChange={(e => setText(e.target.value))}/>
    </Form.Group>
</>)



// this part would change acording to selected question
const AdoptiveArea = (props: { selected_type: Q_type ,setQuestion }) => {
    const [choices, setChoices] = useState<string[]>(['', ''])

    useEffect(() => {
        props.setQuestion(question => {
            let new_question = {...question}
            new_question.choices = choices
            return new_question
        })
        
    }, [choices])
    switch (props.selected_type) {
        case Q_type.MultiChoice:
        case Q_type.SingleChoice:
            return <CreateChoices choices={choices} setChoices={setChoices} />

        default:
            return <div></div>

    }

}