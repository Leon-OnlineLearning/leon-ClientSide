import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { Notification } from "../../model/notification"


type NotificationsProps = {
    notifications: Array<Notification>
}

export default function Notifications({notifications}: NotificationsProps) : JSX.Element{
    return (
        <>
            {
                notifications.map(noti => {
                    return (<Card key={noti.title + noti.date.toString()} className="m-2">
                        <Card.Body>
                            <Card.Text>
                                {noti.title} <b>{noti.date}</b>
                            </Card.Text>
                        </Card.Body>
                    </Card>);
                })
            }
        </>
    )
}