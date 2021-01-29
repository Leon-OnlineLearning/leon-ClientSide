import { Dropdown, DropdownButton, Form } from "react-bootstrap"
import styles from "./chat.module.css"
import Message, { MessageData } from "./utils/message"
import ChatRoom from "./utils/chat-room"
import { useEffect, useState } from "react"

type MessageContent = {
    message: string,
    sender: string,
    date: Date
}

type ChatProps = {
    messages: Array<MessageContent>,
    senderName: string,
    professorPrefix: string,
    yearSelection?: boolean
}

type ChatRoomDate = {
    id: string,
    name: string
}

/**
 * Displays chat content in reverse order 
 * @param param0 
 */
export default function Chat({ messages, senderName, professorPrefix, yearSelection = false }: ChatProps) {
    // NOTE: here i made chat room as a derived value we may need to change that later

    const [yearName, setYearName] = useState("Select year")

    useEffect(() => {
        const firstYear = "Year 1"
        setYearName(firstYear)
    }, [])

    let chatRooms: Array<ChatRoomDate> = [
        { id: "12345679", name: "room1" },
        { id: "12345680", name: "room2" },
    ]

    const onYearsSelected = (eventKey: string) => {
        setYearName(eventKey)
    }

    return (
        <>
            <div className={`${styles["chat-layout"]}`}>
                <div>

                    {yearSelection ?
                        <Dropdown onSelect={onYearsSelected} className={`${styles["dropdown-area"]}`}>
                            <Dropdown.Toggle style={{ width: "95%", margin: "8px" }} variant="primary" id="years" className={`${styles["dropdown-btn"]} bg-secondary`}>
                                {yearName}
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{ width: "95%" }} className={`${styles["dropdown-item"]}`}>
                                <Dropdown.Item eventKey="Year 1" >Year 1</Dropdown.Item>
                                <Dropdown.Item eventKey="Year 2" >Year 2</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> : ""
                    }
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
                                <Message key={`${msg.date.toString()}`} message={msg.message} sender={msg.sender} time={msg.date} professorSenderPrefix={professorPrefix} senderName={senderName} ></Message>
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