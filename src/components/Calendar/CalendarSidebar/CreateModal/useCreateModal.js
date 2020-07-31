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
    if (
      !form.startDay ||
      !form.startHour ||
      !form.endHour ||
      parseInt(form.endHour) < parseInt(form.startHour)
    ) {
      newError.time = "Please enter a valid time";
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
      case "endHour":
        if (newValue === "") {
          return newValue;
        }
        // check if valid hour 0 - 23
        if (validHour.test(newValue)) {
          return newValue;
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
    const day = convertTime(startDay - 1, "day", "hour");
    const startTime = day + parseInt(startHour);
    const endTime = day + parseInt(endHour);
    const task = {
      id,
      name: name,
      description,
      type: taskType.id,
      driver,
      location: { start: startLocation, end: endLocation },
      time: { start: parseInt(startTime), end: parseInt(endTime) },
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
    let localConflictedTasks = [...conflictedTasks];
    let task = transformFormToTaskShape(form);
    const taskDuration = task.time.end - task.time.start;
    // every loop, a conflict free slot is proposed based on immediate conflicts
    // if there is still conflict at the new slot, repeat
    while (
      localConflictedTasks.length ||
      task.time.start % 24 > task.time.end % 24
    ) {
      if (place === "before") {
        // element at conflictedTasks[0] is the earliest conflict
        task.time.end = localConflictedTasks[0].time.start;
        task.time.start = task.time.end - taskDuration;
      } else if (place === "after") {
        // sort task with the latest end time to index 0
        task.time.start = localConflictedTasks.sort(
          (a, b) => b.time.end - a.time.end
        )[0].time.end;
        task.time.end = task.time.start + taskDuration;
      }

      // first parameter is task to be added, rest are to be deleted
      // the task itself need to be deleted in case of edits to stop false conflicts
      // keep checking for free space until no conflict and task not over night
      localConflictedTasks = addAndDeleteTask(task, task.id);
    }
    setShowModal(false);
    setShowConflictOptions(false);
    setForm(initialState);
  }

  function handleOverrideConflict() {
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
