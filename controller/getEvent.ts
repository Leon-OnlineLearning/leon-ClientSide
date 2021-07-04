import { Event } from "../model/event"
import apiInstance from "./utils/api"

export async function getEvents(year: number, month: number) : Promise<Event[]>{  
  const startingFrom = `${year}-${month}-01`
  const endingAt = `${year}-${month + 1}-01`

  const url = `/events/timed?startingFrom=${startingFrom}&endingAt=${endingAt}`
  const res = await apiInstance.get(url)

  
  res.data.map(exam => {
    exam.startTime = new Date(exam.startTime);
    exam.endTime = new Date (exam.endTime)})
    
  console.debug(res.data)
  return res.data as Event[]
}