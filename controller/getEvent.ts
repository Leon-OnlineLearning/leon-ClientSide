import { Event, EventType } from "../model/event"

export function getEvents(year, month): Array<Event> {
    if (year === 2021 && month === 1) {
        return [
            Event.fromJSON({
                startDate: new Date(2021, 0, 4),
                title: "HEE",
                description: "heEeEe",
                endDate: new Date(2021, 0, 5),
                id: "787d8s7a8",
                type: EventType.ASSIGNMENT
            }),
            Event.fromJSON({
                startDate: new Date(2021, 0, 21),
                title: "are you real!",
                description: "hello to my life",
                endDate: new Date(2021, 0, 22),
                id: "787d8s888",
                type: EventType.QUIZ
            }),
            Event.fromJSON({
                startDate: new Date(2021, 0, 21),
                title: "Second",
                description: "Second desc",
                endDate: new Date(2021, 0, 23),
                id: "787d8s888",
                type: EventType.TEST
            })
        ]
    } else {
        return [
            Event.fromJSON({
                startDate: new Date(2021, 1, 13),
                title: "are you real!",
                description: "hello to my life",
                endDate: new Date(2021, 1, 14),
                id: "787d8s888",
                type: EventType.LECTURE
            }),
        ]

    }
}