import { useState } from "react";
import {convertTime} from "../../../../utils/convertTime"
export default function useCreateModal(initialState, addTask) {
  const [form, setForm] = useState(initialState);

  function validateOnChange(name, newValue, oldValue) {
    switch (name) {
      case "startDay":
      case "endDay":
        if (newValue >= 0 && newValue <= 364) {
          return newValue;
        }
        return oldValue;
      case "startHour":
      case "endHour":
        if (newValue >= 0 && newValue < 24) {
          return newValue;
        }
        return oldValue;
      default:
        return newValue;
    }
  }
  function handleOnChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: validateOnChange(name, value, prev[name]),
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
      endDay,
      endHour,
    } = form;
    const startTime = convertTime(startDay, "day", "hour") + startHour;
    const endTime = convertTime(endDay, "day", "hour") + endHour;
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
  return {
    form,
    handleOnChange,
    handleDriverChange,
    handleTaskTypeChange,
    handleAddTask,
  };
}
