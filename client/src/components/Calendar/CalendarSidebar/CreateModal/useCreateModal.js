import { useState } from "react";
import { convertTime } from "../../../../utils/convertTime";
export default function useCreateModal(initialState, addTask, setShowModal) {
  const [form, setForm] = useState(initialState);
  const [errors, setError] = useState({});

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

  function handleAddTask() {
    // need to transform data so form state because task state in useCalendar
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
    } = form;
    const day = convertTime(startDay, "day", "hour");
    const startTime = day + parseInt(startHour);
    const endTime = day + parseInt(endHour);
    const task = {
      name: name,
      detail: description,
      type: taskType.id,
      driver,
      location: { start: startLocation, end: endLocation },
      time: { start: startTime, end: endTime },
    };
    addTask(task);
  }

  function handleSubmit() {
    const newErrors = validateSubmit(form);
    if (Object.keys(newErrors).length) {
      setError(newErrors);
      console.log("why");
    } else {
      handleAddTask();
      setShowModal(false);
    }
  }
  return {
    form,
    errors,
    handleOnChange,
    handleDriverChange,
    handleTaskTypeChange,
    handleSubmit,
  };
}
