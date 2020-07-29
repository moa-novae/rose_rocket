import { useState } from "react";
import uniqueId from "../../utils/uniqueId";
/*
  I couldn't find a good library that implements time on 
  a 24 h / 7 day / 52 week discrete timescale. Popular libraries 
  like MomentJS are implemented in real world timescales. 
  For simplicity sake, I ended up just writing the way the 
  time works myself.
 */
export default function useCalendar() {
  /* I've elected to use useState instead of useReducer because the various states 
  don't really rely on the value of another state in order to update*/
  /* Time 0 is set set arbitrarily to some point in the spacetime
  Each increment of 1 represents the passing of one hour
  Not sure if this is the best way to keep track of time
  Can switch to momentJS in the future
  No use for time state right now since not using real world time
  */
  // const [time, setTime] = useState(0);
  // weeks starts incrementing at 0
  const [calendarTime, setCalendarTime] = useState(0);
  // state responsible for controlled input of calendar header weeks
  const [weekInput, setWeekInput] = useState(calendarTime);
  // keep track of which drivers fall under the dispatcher each year
  // and whether they are shown on the calendar
  const driversTemp = [
    { id: 1, name: "bob", selected: true },
    { id: 2, name: "joe", selected: true },
  ];
  const [drivers, setDrivers] = useState(driversTemp);
  // tasks of the year
  const initialYearTasks = new Map([
    [
      "abcdef",
      {
        id: "abcdef",
        name: "task1",
        detail: "very cool",
        type: "pickup",
        time: { start: 100, end: 103 },
        driver: { id: 1, name: "bob" },
        location: { start: "a", finish: "b" },
      },
    ],
    [
      "fedcba",
      {
        id: "fedcba",
        name: "task2",
        detail: "super cool",
        type: "dropoff",
        time: { start: 200, end: 202 },
        driver: { id: 2, name: "joe" },
        location: { start: "c", finish: "d" },
      },
    ],
  ]);
  const [yearlyTasks, setYearlyTasks] = useState(initialYearTasks);
  const toggleDriverSelected = function (driverId) {
    setDrivers((prev) => {
      // find index of toggled driver in state array
      const toggledDriverIndex = prev
        .map((driver) => driver.id)
        .indexOf(driverId);
      // // construct new state array where selected bool is toggled
      return prev.map((driver, i) => {
        if (i === toggledDriverIndex) {
          return { ...driver, selected: !driver.selected };
        }
        return driver;
      });
    });
  };
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
  // return which day of the week and what hour in 24hr
  const findDayAndHourFromTime = function (time) {
    const day = Math.floor((time % timeRatio.week) / timeRatio.day);
    const hour = time % timeRatio.day;
    return { day, hour };
  };

  // handles controlled input of calendar header
  const handleOnChange = function (e) {
    const newValue = e.target.value.trim();
    // number must be between 0-51 included
    console.log(weekInput);
    const re = /^([0-9]|[1-4][0-9]|5[01])$/;
    setWeekInput((prev) => {
      if (re.test(newValue) || newValue === "") {
        return newValue;
      } else {
        return prev;
      }
    });
  };

  // change week to selected week from week input box
  const handleWeekJump = function () {
    const weekDifference = weekInput - week;
    console.log(weekDifference);
    changeWeekBy(weekDifference);
  };

  // find the task of the week currently viewed
  let weeklyTasks = Array.from(yearlyTasks.values()).filter((task) => {
    return Math.floor(convertTime(task.time.start, "hour", "week")) === week;
  });
  //transform data to indicate day and time
  weeklyTasks = weeklyTasks.map((task) => ({
    ...task,
    ...findDayAndHourFromTime(task.time.start),
    duration: task.time.end - task.time.start,
  }));

  return {
    changeWeekBy,
    week,
    weeklyTasks,
    weekInput,
    handleOnChange,
    handleWeekJump,
    drivers,
    toggleDriverSelected,
  };
}
