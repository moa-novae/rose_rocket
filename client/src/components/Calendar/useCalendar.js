import { useState } from "react";

/*
  I couldn't find a good library that implements time on 
  a 24 h / 7 day / 52 week discrete timescale. Popular libraries 
  like MomentJS are implemented in real world timescales. 
  For simplicity sake, I ended up just writing the way the 
  time works myself.
 */
export default function useCalendar() {
  /* Time 0 is set set arbitrarily to some point in the spacetime
  Each increment of 1 represents the passing of one hour
  Not sure if this is the best way to keep track of time
  Can switch to momentJS in the future
  No use for time state right now since not using real world time
  */
  // const [time, setTime] = useState(0);
  const [calendarTime, setCalendarTime] = useState(0);

  const timeRatio = {
    hour: 1,
    day: 24,
    week: 168,
    year: 8736,
  };

  const convertTime = function (time, from, to) {
    return time * (timeRatio[from] / timeRatio[to]);
  };
  // number of week into the year
  const week = convertTime(calendarTime % timeRatio.year, "hour", "week");

  const changeWeekBy = (n) => {
    setCalendarTime((prev) => {
      const newWeek = prev + n * timeRatio.week;
      // Don't allow negative weeks
      return newWeek >= 0 ? newWeek : prev;
    });
  };

  const findDayAndHourFromTime = function (time) {
    const day = Math.floor((time % timeRatio.week) / timeRatio.day);
    const hour = time % timeRatio.day;
    return { day, hour };
  };
  let weeklyTasks = [];
  if (week === 0) {
    //api response placeholder
    weeklyTasks = [{ name: "task1", detail: "very cool", time: 100 }];
    //transform data to indicate day and time
    weeklyTasks = weeklyTasks.map((task) => ({
      ...task,
      time: findDayAndHourFromTime(task.time),
    }));
  }
  if (week === 1) {
    weeklyTasks = [{ name: "task2", detail: "super cool", time: 200 }];
    weeklyTasks = weeklyTasks.map((task) => ({
      ...task,
      time: findDayAndHourFromTime(task.time),
    }));
  }
  return {
    changeWeekBy,
    week,
    weeklyTasks,
  };
}
