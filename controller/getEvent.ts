import axios from "axios"
import { Event } from "../model/event"
import config from "../utils/config"

export async function getEvents(year: number, month: number): Promise<Event[]> {
  const startingFrom = `${year}-${month}-01`
  const endingAt = `${year}-${month + 1}-01`
  const response = await axios
    .get(
      `${config.serverBaseUrl}/students/${localStorage.getItem('id')
      }/events?startingFrom=${startingFrom}&endingAt=${endingAt}`,
      { withCredentials: true }
    )
  console.log(response.data)
  return response.data
}
