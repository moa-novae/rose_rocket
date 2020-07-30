import { useState } from "react";
import { convertTime } from "../../../../utils/convertTime";
export default function useCreateModal(
  initialState,
  addTask,
  deleteTask,
  addAndDeleteTask,
  setShowModal
) {
  const [form, setForm] = useState(initialState);
  const [errors, setError] = useState({});
  const [showConflictOptions, setShowConflictOptions] = useState(false);
  const [conflictedTasks, setConflictedTasks] = useState([]);
  function validateSubmit(form) {
    let newError = {};
    if (!form.name) {
      newError.name = "Name cannot be empty";
    }
    if (!form.taskType.id) {
      newError.taskType = "A task type must be selected";
    }
    if (!form.driver.id) {
      newError.driver = "A driver must be selected";
    }
    if (!form.startDay || !form.startHour || !form.endHour) {
      newError.time = "Please enter a complete time";
    }
    return newError;
  }

  function validateOnChange(name, newValue, oldState) {
    const validDay = /^([0-9]|[1-8][0-9]|9[0-9]|[12][0-9]{2}|3[0-5][0-9]|36[0-3])$/;
    const validHour = /^([0-9]|1[0-9]|2[0-3])$/;
    switch (name) {
      case "startDay":
        if (newValue === "") {
          return newValue;
        }
        // check if valid day 0 - 363
        if (validDay.test(newValue)) {
          return newValue;
        }
        return oldState[name];
      case "startHour":
        if (newValue === "") {
          return newValue;
        }
        // check if valid hour 0 - 23
        if (validHour.test(newValue)) {
          // check if startHour less than endHour
          if (
            parseInt(newValue) < parseInt(oldState.endHour) ||
            !oldState.endHour
          ) {
            return newValue;
          }
        }
        return oldState[name];
      case "endHour":
        if (newValue === "") {
          return newValue;
        }
        // check if valid hour 0 - 23
        if (validHour.test(newValue)) {
          // check if endHour less than startHour
          if (
            parseInt(newValue) > parseInt(oldState.startHour) ||
            !oldState.startHour
          ) {
            return newValue;
          }
        }
        return oldState[name];
      default:
        return newValue;
    }
  }
  function handleOnChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: validateOnChange(name, value, prev),
    }));
  }
  function handleDriverChange(driver) {
    setForm((prev) => ({ ...prev, driver }));
  }
  function handleTaskTypeChange(taskType) {
    setForm((prev) => ({ ...prev, taskType }));
  }

  function transformFormToTaskShape(form) {
    const {
      name,
      description,
      taskType,
      driver,
      startLocation,
      endLocation,
      startDay,
      startHour,
      endHour,
      id,
    } = form;
    const day = convertTime(startDay, "day", "hour");
    const startTime = day + parseInt(startHour);
    const endTime = day + parseInt(endHour);
    const task = {
      id,
      name: name,
      description,
      type: taskType.id,
      driver,
      location: { start: startLocation, end: endLocation },
      time: { start: startTime, end: endTime },
    };
    return task;
  }

  function handleSubmit() {
    const newErrors = validateSubmit(form);
    if (Object.keys(newErrors).length) {
      setError(newErrors);
    } else {
      // need to transform form state to the shape of task state in useCalendar
      // addTask return array of conflicted tasks if any
      const conflictedTasks = addTask(transformFormToTaskShape(form));
      if (conflictedTasks?.length) {
        setConflictedTasks(conflictedTasks);
        setShowConflictOptions(true);
      } else {
        // close modal if no errors in form and no conflict
        setShowModal(false);
        setForm(initialState);
      }
    }
  }

  function handlePlaceAroundConflict(place) {
    let newEndTime;
    let newStartTime;
    const taskDuration = form.endHour - form.startHour;
    if (place === "before") {
      // element at conflictedTasks[0] is the earliest conflict
      newEndTime = conflictedTasks[0].time.start;
      newStartTime = newEndTime - taskDuration;
    } else if (place === "after") {
      // sort task with the latest end time to index 0
      newStartTime = conflictedTasks.sort((a, b) => b.time.end - a.time.end)[0]
        .time.end;
      newEndTime = newStartTime + taskDuration;
    }
    // convert time (in hours) to time of day (ex: 6:00)
    const newEndHour = newEndTime % 24;
    const newStartHour = newStartTime % 24;
    const conflictResolvedForm = {
      ...form,
      startHour: newStartHour,
      endHour: newEndHour,
    };
    const task = transformFormToTaskShape(conflictResolvedForm);
    // first parameter is task to be added, rest are to be deleted
    addAndDeleteTask(task, task.id);
    setShowModal(false);
    setShowConflictOptions(false);
    setForm(initialState);
  }

  function handleOverrideConflict() {
    console.log("conflicted tasks", conflictedTasks);
    const task = transformFormToTaskShape(form);
    addAndDeleteTask(task, ...conflictedTasks.map((task) => task.id));
    setShowModal(false);
    setShowConflictOptions(false);
    setForm(initialState);
  }
  function closeConflictOptions() {
    setShowConflictOptions(false);
  }
  return {
    form,
    showConflictOptions,
    closeConflictOptions,
    errors,
    handleOnChange,
    handleDriverChange,
    handleTaskTypeChange,
    handleSubmit,
    handlePlaceAroundConflict,
    handleOverrideConflict,
  };
}
