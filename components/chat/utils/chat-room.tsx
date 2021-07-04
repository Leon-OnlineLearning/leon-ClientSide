import { Card } from "react-bootstrap"

type ChatRoomProps = {
    name: string,
    onClick: (id) => void,
    selected?: boolean
}
export default function ChatRoom({ name, onClick, selected }: ChatRoomProps): JSX.Element {
    let classN = "m-2"
    return (
        <>
            <Card className={selected ? `${classN} bg-primary text-light` : `${classN} text-dark`} onClick={onClick}>
                <Card.Body>
                    <Card.Text>
                        {name}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}