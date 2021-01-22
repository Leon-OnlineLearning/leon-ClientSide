import styles from "./chat-utils.module.css"

export type MessageData = {
    message: string,
    sender: string,
    time: Date,
    senderName: string,
    professorSenderPrefix: string
}

export default function Message({ message, sender, time, senderName, professorSenderPrefix }: MessageData) {
    let messageClassName = `${styles["message-general"]} bg-secondary`
    if (sender === senderName) {
        messageClassName = `${styles["message-me"]} bg-primary`
    } else if (sender.startsWith(professorSenderPrefix)) {
        messageClassName = `${styles["message-prof"]} bg-danger`
    }
    messageClassName += " my-1 mx-3 text-light p-2"
    
    return (
        <>
            <div className={messageClassName}>
                {sender} @ {`${time.toDateString()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`}<br/>
                {message}
            </div>
        </>
    )
}