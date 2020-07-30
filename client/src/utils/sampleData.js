export const initialDrivers = [
  { id: 1, name: "Darius the Great", selected: true },
  { id: 2, name: "Ivan the Terrible", selected: true },
  { id: 3, name: "Richard the Lionheart", selected: true },
];
export const initialYearTasks = new Map([
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