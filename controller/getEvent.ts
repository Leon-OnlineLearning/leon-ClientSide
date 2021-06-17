import { Event } from "../model/event"
import apiInstance from "./utils/api"

export async function getEvents(year: number, month: number) : Promise<Event[]>{  
  const startingFrom = `${year}-${month}-01`
  const endingAt = `${year}-${month + 1}-01`

  const url = `/events/timed?startingFrom=${startingFrom}&endingAt=${endingAt}`
  const response = await apiInstance.get(url)

  console.debug(response.data)
  return response.data 
}