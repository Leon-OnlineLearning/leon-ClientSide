import { Form } from "react-bootstrap"
import styles from "./chat.module.css"
import Message, { MessageData } from "./utils/message"
import ChatRoom from "./utils/chat-room"

type MessageContent = {
    message: string,
    sender: string,
    date: Date
}

type ChatProps = {
    messages: Array<MessageContent>,
    senderName: string,
    professorPrefix: string,
}

type ChatRoomDate = {
    id: string,
    name: string
}

/**
 * Displays chat content in reverse order 
 * @param param0 
 */
export default function Chat({ messages, senderName, professorPrefix }: ChatProps) {
    // NOTE: here i made chat room as a derived value we may need to change that later
    let chatRooms: Array<ChatRoomDate> = [
        { id: "12345679", name: "room1" },
        { id: "12345680", name: "room2" },
    ]
    return (
        <>
            <div className={`${styles["chat-layout"]}`}>
                <div >
                    <div className={`${styles["chat-rooms-container"]}`}>
                        {chatRooms.map(room => {
                            return (
                                <ChatRoom key={room.id} name={room.name} onClick={() => console.log(room.id)}></ChatRoom>
                            )
                        })
                        }
                        <ChatRoom name={"selected room"} onClick={() => console.log("hello world selected")} selected></ChatRoom>
                        <ChatRoom name={"unselected room"} onClick={() => console.log("hello world selected")}></ChatRoom>
                        <ChatRoom name={"unselected room"} onClick={() => console.log("hello world selected")}></ChatRoom>
                        <ChatRoom name={"unselected room"} onClick={() => console.log("hello world selected")}></ChatRoom>
                        <ChatRoom name={"unselected room"} onClick={() => console.log("hello world selected")}></ChatRoom>
                        <ChatRoom name={"unselected room"} onClick={() => console.log("hello world selected")}></ChatRoom>
                    </div>
                </div>
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