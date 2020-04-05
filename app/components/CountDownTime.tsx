import React, { useState, useEffect } from "react";
import moment from "moment";

interface TimerWatchProps {
  date: Date;
}
const CountDownTime: React.SFC<TimerWatchProps> = ({ date }) => {
  const [timer] = useState<Date>(date);
  let eventDate = moment
    .duration()
    .add({
      days: date.getDay(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds()
    });
  const [timerSecond, setTimerSecond] = useState(0);
  const [timerMinute, setTimerMinute] = useState(0);
  const [timerHour, setTimerHour] = useState(0);
  const [timerDay, setTimerDay] = useState(0);

  useEffect(() => {
    let id = setInterval(() => {
      eventDate = eventDate.subtract(1, "s");
      const days = eventDate.days();
      const hours = eventDate.hours();
      const mins = eventDate.minutes();
      const secs = eventDate.seconds();

      setTimerSecond(secs);
      setTimerMinute(mins);
      setTimerHour(hours);
      setTimerHour(days);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <>
      {timerDay} : {timerHour} : {timerMinute} : {timerSecond}
    </>
  );
};
export default CountDownTime;
