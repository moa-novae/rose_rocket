export default function findOverlappingTasks(tasks) {
  const overlappingTasks = [];
  for (const currentTask of tasks) {
    function overlap(task) {
      // check if currentTask start time between task start/end
      if (currentTask.id === task.id) {
        return false
      }
      else if (
        currentTask.time.start >= task.time.start &&
        currentTask.time.start < task.time.end
      ) {
        return true;
      }
      // check if currentTask end time between task start/end
      else if (
        currentTask.time.end > task.time.start &&
        currentTask.time.end <= task.time.end
      ) {
        return true;
      } else {
        return false;
      }
    }
    if (tasks.some(overlap)) {
      overlappingTasks.push(currentTask.id);
    }
  }

  return overlappingTasks;
}
