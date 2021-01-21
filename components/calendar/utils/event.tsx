
export type EventProp = {
    title: string,
    description: string,
    date: Date
}

export function Event({title, description, date}: EventProp) {
    console.log("title", title);
    
    const onEventClicked = () => {
        console.log("title:\n", title, "\ndesc:\n", description, "\ndate:\n", date);
    }
    return (
        <span onClick={onEventClicked} style={{backgroundColor:"#f36f00"}}>
            {title}
        </span>
    );
}