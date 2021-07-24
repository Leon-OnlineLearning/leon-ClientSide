import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
interface TimerProps {
  timerLength: number,
  onTimerFinish: CallableFunction,
  shouldFreeze: boolean
  freeze_duration: number
  time_secs: number
  setTimeSecs: Dispatch<SetStateAction<number>>
}

const Timer: FC<TimerProps> = ({ onTimerFinish, timerLength, shouldFreeze,freeze_duration, time_secs, setTimeSecs }) => {

  const [time_formatted, setTime_formatted] = useState(secondsToTime(timerLength))


  const intervalRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    // create interval at the start of the timer mounting
    if (time_secs === timerLength) {
      intervalRef.current = _create_time_interval(setTimeSecs, setTime_formatted)
    }
    
    // start another interval after freeze duration
    if (shouldFreeze) {
      setTimeout(() => {
        intervalRef.current = _create_time_interval(setTimeSecs, setTime_formatted)
      },freeze_duration*1000)
    }
    
    //clear the interval
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [shouldFreeze])

  useEffect(() => {
    if (time_secs == 0) {
      onTimerFinish();
    }
  }, [time_secs])
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


function _create_time_interval(timeSetter, formatted_setter) {

  let interval = setInterval(() => {
    timeSetter(time => {
      formatted_setter(secondsToTime(time - 1))
      const _time = Math.max(time - 1, 0)
      if (_time === 0) {
        clearInterval(interval);
      }
      return _time
    })
  }, 1000)
  return interval
}