
export function getEvents(year, month) {
    console.log("getting events for", year, month);
    if (year === 2021 && month === 1) {
        return [
            {
                date: new Date(2021, 0, 4),
                title: "HEE",
                description: "heEeEe"
            },
            {
                date: new Date(2021, 0, 21),
                title: "are you real!",
                description: "hello to my life"
            },
            {
                date: new Date(2021,0,21),
                title: "Second",
                description: "Second desc"
            }
        ]
    } else {
        return [
            {
                date: new Date(2021,1,13),
                title: "are you real!",
                description: "hello to my life"
            },
        ]

    }
}