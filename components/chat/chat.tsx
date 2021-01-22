import { Form } from "react-bootstrap"
import styles from "./chat.module.css"
import Message, { MessageData } from "./utils/message"

type MessageContent = {
    message: string,
    sender: string,
    date: Date
}

type ChatProps = {
    messages: Array<MessageContent>,
    senderName: string,
    professorPrefix: string
}

/**
 * Displays chat content in reverse order 
 * @param param0 
 */
export default function Chat({ messages, senderName, professorPrefix }: ChatProps) {
    return (
        <>
            <div className={`${styles["chat-layout"]}`}>
                chat rooms
                <div>
                    <div className={`${styles["chat-container"]}`}>
                        {messages.map(msg => {
                            return (
                                <Message message={msg.message} sender={msg.sender} time={msg.date} professorSenderPrefix={professorPrefix} senderName={senderName} ></Message>
                            )
                        })}
                    </div>
                    <Form>
                        <Form.Group controlId="formMessage" style={{ margin: "8px" }}>
                            <Form.Control placeholder="Write message" />
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </>
    )
}