import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form"
import { QuestionInterface, Q_type } from "../../../model/examination/question"
import CreateChoices from "./choices";



type updateCallBack = (oldQuestion: QuestionInterface) => QuestionInterface;


interface propsQuestionInterface  { 
    question: QuestionInterface, 
    updateQuestion: (callBack: updateCallBack) => void
}

export default function CreateQuestion(props: propsQuestionInterface)  
    {
    const changeType = (newType) => (props.updateQuestion(question => {
        // TODO remove adoptive area fields
        let newQuestion = {...question }
        newQuestion.questionType = newType
        return newQuestion
    }))


    const changeText = (newText) => (props.updateQuestion(question => {
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
        question={props.question} 
        updateQuestion={props.updateQuestion}/>
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
const AdoptiveArea = (props: propsQuestionInterface) => {
    const selectedLang = props.question.code_lang

    const setCodeLang = (new_lang => props.updateQuestion(question => {
        let new_question = {...question}
        new_question.code_lang = new_lang
        return new_question
    }))

    function updateChoices(updateCallback) {
        props.updateQuestion(question => {
            let new_question = {...question}
            new_question.choices = updateCallback(question.choices)
            return new_question
        })
    }

    switch (props.question.questionType) {
        case Q_type.MultiChoice:
        case Q_type.SingleChoice:
            return <CreateChoices choices={props.question.choices} updateChoices={updateChoices} />
        case Q_type.Code:
            return <CreateCodeLang selectedlang={selectedLang} setCodeLang={setCodeLang} />
        default:
            return <div></div>

    }

}



const CreateCodeLang = ({selectedlang,setCodeLang}) =>{
    // TODO get this from codeMirror
    const available_languages = ['c','python','js'];
    
    return  (
    <Form.Group>
    <Form.Label>coding language</Form.Label>
    <Form.Control as="select" 
    onChange={e => setCodeLang(e.target.value)} 
    value={selectedlang}>
        {available_languages.map(type_name => <option key={type_name}>{type_name}</option>)}
    </Form.Control>
</Form.Group>
    )
}