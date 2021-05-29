import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import CreateQuestion from './create_question'
import styles from './ExamContainer.module.css'

/**
 * layout for exam form
 * @param questions
 * @returns 
 */
export default function QuestionContainer({question,updateQuestion,deleteQuestion,index}){
    return (
        <div className="my-3 p-2 border rounded border-secondary">
            <Row className="justify-content-between">
               <Col> 
            <h3>question #{index+1}</h3>
               </Col > 
               <Col className="d-flex justify-content-end">
               <Button variant="danger" onClick={deleteQuestion}>delete question</Button>
               </Col>
            </Row>
            <CreateQuestion question={question} updateQuestion={updateQuestion}/>
            
            </div>
    )
    }
