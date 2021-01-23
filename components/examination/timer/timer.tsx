import { useEffect, useState } from 'react';
export default function Timer({test_length}){
    const [time_secs,setTime_secs] = useState(test_length)
    const [time_formatted,setTime_formatted] = useState(secondsToTime(test_length))
    
    useEffect(() =>{
        let interval = setInterval(() =>{
        setTime_secs(time_secs-1)
        setTime_formatted(secondsToTime(time_secs-1))
        },1000)

        return function cleanup() {
            clearInterval(interval);
          }
    })
    
    return <h1 style={{color:'white'}}>{`${time_formatted.h}:${time_formatted.m}:${time_formatted.s}`}</h1>
}

function secondsToTime(secs:number){
    
    let format = (n:number) => n < 10 ? '0'+n.toString() : n.toString()
    
    let hours = Math.floor(secs / (60 * 60));
    

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);
    

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let formatted_time = {
      "h": format(hours),
      "m": format(minutes),
      "s": format(seconds)
    };
    return formatted_time;
  }