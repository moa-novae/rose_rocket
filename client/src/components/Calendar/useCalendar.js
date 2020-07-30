import { useState, useEffect } from "react";
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
  // driversSelected state keeps track of which driver is selected and shows on calendar
  const [driversSelected, setDrivers] = useState(driversTemp);
  // remove selected property to form driversList
  // it will used for creating new tasks and keep track of who are all the drivers
  const driversList = driversSelected.map(({ id, name }) => ({ id, name }));
  // tasks of the year
  const initialYearTasks = new Map([
    [
      "abcdef",
      {
        id: "abcdef",
        name: "task1",
        description: "very cool",
        type: "pickup",
        time: { start: 100, end: 103 },
        driver: { id: 1, name: "bob" },
        location: { start: "a", finish: "b" },
      },
    ],
    [
      "abdef",
      {
        id: "abdef",
        name: "new",
        description: "very cool",
        type: "pickup",
        time: { start: 103, end: 104 },
        driver: { id: 1, name: "bob" },
        location: { start: "a", finish: "b" },
      },
    ],
    [
      "fedcba",
      {
        id: "fedcba",
        name: "task2",
        description: "super cool",
        type: "dropoff",
        time: { start: 200, end: 202 },
        driver: { id: 2, name: "joe" },
        location: { start: "c", finish: "d" },
      },
    ],
  ]);
  const [yearlyTasks, setYearlyTasks] = useState(initialYearTasks);

  // sort yearlyTasks to find conflicting tasks easier
  // sorted from earliest to latest
  const sortTasks = function () {
    return new Map(
      [...yearlyTasks.entries()].sort(
        (a, b) => a[1].time.start - b[1].time.start
      )
    );
  };

  const checkTimeConflict = function (newTask) {
    const conflictedTasks = [];
    for (const [id, existingTask] of yearlyTasks) {
      // if different drivers, pass

      if (existingTask.driver.id !== newTask.driver.id) {
        continue;
      }
      // if same task, pass
      // this occurs when editing task
      else if (existingTask.id === newTask.id) {
        continue;
      }
      // check if existing task start time between new task start/end
      if (
        existingTask.time.start >= newTask.time.start &&
        existingTask.time.start < newTask.time.end
      ) {
        conflictedTasks.push(existingTask);
      }
      // check if existing task end time between new task start/end
      else if (
        existingTask.time.end > newTask.time.start &&
        existingTask.time.end <= newTask.time.end
      ) {
        conflictedTasks.push(existingTask);
      }
      // should leave loop when existing tasks happen after new task
      else if (existingTask.time.start >= newTask.time.end) {
        break;
      }
    }
    return conflictedTasks;
  };
  // maybe refactoring this to promise based would be more readable
  const addTask = function (task) {
    const conflictedTasks = checkTimeConflict(task);
    if (!conflictedTasks.length) {
      setYearlyTasks((prev) => {
        const newTasksMap = new Map(prev);
        // if id exists, the task is edited by reusing id
        const id = task.id ? task.id : uniqueId();
        newTasksMap.set(id, { ...task, id });
        return newTasksMap;
      });
    } else {
      return conflictedTasks;
    }
  };

  const deleteTask = function (taskId) {
    setYearlyTasks((prev) => {
      const newTasksMap = new Map(prev);
      newTasksMap.delete(taskId);
      return newTasksMap;
    });
  };
  /* this function is needed because when resolving conflicted tasks,
  overriding a conflicted task means at least one task is deleted and one 
  added at the same time. By calling addTask after deleteTask, we cannot 
  ensure that the conflicted task is deleted before addTask modifies the 
  task state, therefore causing checkTimeConflict, which is called by 
  addTask, to stop any updates to the task state */
  const addAndDeleteTask = function (taskToBeAdded, ...taskToBeDeleted) {
    setYearlyTasks((prev) => {
      const newTasksMap = new Map(prev);
      taskToBeDeleted.forEach((taskId) => {
        newTasksMap.delete(taskId);
      });
      const id = taskToBeAdded.id ? taskToBeAdded.id : uniqueId();
      newTasksMap.set(id, { ...taskToBeAdded, id });
      return newTasksMap;
    });
  };

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
    addTask,
    deleteTask,
    addAndDeleteTask,
    changeWeekBy,
    week,
    weeklyTasks,
    weekInput,
    handleOnChange,
    handleWeekJump,
    driversSelected,
    driversList,
    toggleDriverSelected,
  };
}
