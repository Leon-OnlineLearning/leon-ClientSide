import { Dispatch, SetStateAction, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { XCircle } from 'react-bootstrap-icons';



type updateCallBack = (oldChoices: string[]) => string[];

interface createChoicePropsInterface {
     choices: string[],
    updateChoices: (callback: updateCallBack )=>void
}

export default function CreateChoices(props: createChoicePropsInterface) {

    // create two empty choices on first mount
    useEffect(() => {
        props.updateChoices(_ => ['',''])

    }, [])

    const addEmptyChoice = () => props.updateChoices(choices => choices.concat(""))

    const removeChoice = (index_to_remove) => props.updateChoices(choices => (
        choices.filter((_, index) => index !== index_to_remove)
    ))

    const editChoice = (new_value, index) => {
        props.updateChoices(choices => {
            let newChoices = [...choices]
            newChoices[index] = new_value
            return newChoices
        })
    }

    return (
        <Form.Group>
            <Form.Label>choices </Form.Label>
            {
                props.choices && props.choices.map((choice, index) => (

                    <Form.Group as={Row} key={['goup', index].join('_')}>
                        <Col>
                            <Form.Control type="text"
                                placeholder={`choice ${index+1}`}
                                value={choice}
                                key={'inp_choi' + index}
                                onChange={(e) => editChoice(e.target.value, index)} />

                        </Col>
                        <Col>

                            <Button variant="outline-danger" onClick={() => removeChoice(index)}>
                                <XCircle />
                            </Button>
                        </Col>
                    </Form.Group>

                ))
            }
            <Form.Group>
                <Button onClick={addEmptyChoice}>add choice</Button>
            </Form.Group>
        </Form.Group>

    )
}