import { useState } from "react";
export default function useGenerateCsf(yearlyTasks, driversList) {
  const [csvInterval, setCsvInterval] = useState({ id: 2, name: "2 days" });
  const [driverSelected, setDriverSelected] = useState(driversList[0]);
  const [data, setData] = useState([]);

  const possibleInterval = [
    { id: 2, name: "2 days" },
    { id: 4, name: "4 days" },
    { id: 7, name: "7 days" },
    { id: 14, name: "14 days" },
    { id: 28, name: "28 days" },
  ];
  const headers = [
    { label: "Time Frame", key: "timeFrame" },
    { label: "Pickup", key: "pickup" },
    { label: "Drop-off", key: "dropoff" },
    { label: "Other", key: "other" },
  ];
  function summarizeDriverActivities() {
    const intervalDuration = csvInterval.id;
    // find all task of the driver selected
    // convert map to array first
    const driverTasks = Array.from(yearlyTasks.values()).filter(
      (task) => task.driver.id === driverSelected.id
    );
    // generate the accumulator object used to tally tasks
    let initialAccumulator = {};
    for (let i = 0; i < 364; i++) {
      // if beginning of interval
      if (i % intervalDuration === 0) {
        initialAccumulator[i] = { pickup: 0, dropoff: 0, other: 0 };
      }
    }

    function sumEachInterval(initialAccumulator, tasks) {
      const taskTally = tasks.reduce((accumulator, task) => {
        const taskDay = Math.floor(task.time.start / 24);
        /* ex: for day 5 at 2 day interval, the interval 
        which it belongs to is 4 - 5. so taskInterval = 4*/
        const taskInterval = taskDay - (taskDay % intervalDuration);
        const newAccumulator = { ...accumulator };
        // increment the appropriate task type
        newAccumulator[taskInterval][task.type] += 1;
        return newAccumulator;
      }, initialAccumulator);
      return Object.entries(taskTally);
    }
    // transform data to shape accepted by react-csv
    function transformToCsvShape(data) {
      const output = [];
      for (const [intervalStartDay, tally] of data) {
        output.push({
          timeFrame: `Day ${intervalStartDay} - Day ${
            parseInt(intervalStartDay) + intervalDuration
          }`,
          ...tally,
        });
      }
      return output;
    }
    return transformToCsvShape(
      sumEachInterval(initialAccumulator, driverTasks)
    );
  }

  function handleDownload() {
    setData(summarizeDriverActivities());
  }
  const filename = `${driverSelected.id}-${driverSelected.name}-${csvInterval.id}-days-interval-summary`;

  return {
    csvInterval,
    setCsvInterval,
    possibleInterval,
    driverSelected,
    setDriverSelected,
    handleDownload,
    data,
    headers,
    filename,
  };
}
