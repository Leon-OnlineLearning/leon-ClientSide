import { FC, useEffect, useState } from 'react';
interface TimerProps {
  timerLength: number,
  onTimerFinish: CallableFunction
}

const Timer: FC<TimerProps> = ({ timerLength, onTimerFinish }) => {
  const [time_secs, setTime_secs] = useState(timerLength)
  const [time_formatted, setTime_formatted] = useState(secondsToTime(timerLength))


  useEffect(() => {
    let interval = setInterval(() => {
      setTime_secs(time => {
        setTime_formatted(secondsToTime(time - 1))
        const _time = Math.max(time - 1, 0)
        if (_time === 0) {
          clearInterval(interval);
        }
        return _time
      })
    }, 1000)
  }, [])

  useEffect(()=>{
    if (time_secs == 0){
      onTimerFinish();
    }
  },[time_secs])
  return <h1 style={{ color: 'white' }}>{`${time_formatted.h}:${time_formatted.m}:${time_formatted.s}`}</h1>
}

export default Timer;

function secondsToTime(secs: number) {

  let format = (n: number) => n < 10 ? '0' + n.toString() : n.toString()

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