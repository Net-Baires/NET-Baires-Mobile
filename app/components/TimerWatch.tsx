import React, { useState, useEffect } from "react";
import {
  Text} from "@components";

interface TimerWatchProps {
  startDate: Date;
}
const TimerWatch: React.SFC<TimerWatchProps> = ({startDate}) => {
  const [timer] = useState<Date>(startDate);
  const [timerSecond, setTimerSecond] = useState(0);
  const [timerMinute, setTimerMinute] = useState(0);
  const [timerHour, setTimerHour] = useState(0);
 
  useEffect(() => {
    let id = setInterval(() => {
      setTimerSecond(new Date().getSeconds() - timer.getSeconds());
      setTimerMinute(new Date().getMinutes() - timer.getMinutes());
      setTimerHour(new Date().getHours() - timer.getHours());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <Text>
      {timerHour} : {timerMinute} : {timerSecond}
    </Text>
  );
};
export default TimerWatch;
