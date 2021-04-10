import axios from "axios"
import { Event, EventType } from "../model/event"
import config from "../utils/config"

export function getEvents(year: number, month: number): Promise<Event[]> {
    const startingFrom = `${year}-${month}-01`
    const endingAt = `${year}-${month + 1}-01`
    return axios.get(`${config.serverBaseUrl}/students/${localStorage.getItem('id')}/events?startingFrom=${startingFrom}&endingAt=${endingAt}`)
        .then(response => {
            console.log(response.data);
            return response.data
        })
}