export const initialDrivers = [
  { id: 1, name: "Darius the Great", selected: true, colour: "#B8EBD0" },
  { id: 2, name: "Ivan the Terrible", selected: true, colour: "#084887" },
  { id: 3, name: "Richard the Lionheart", selected: true, colour: "#909CC2" },
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
      driver: { id: 1, name: "Darius the Great" },
      location: { start: "a", end: "b" },
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
      driver: { id: 1, name: "Ivan the Terrible" },
      location: { start: "a", end: "b" },
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
      driver: { id: 2, name: "Richard the Lionheart" },
      location: { start: "c", end: "d" },
    },
  ],
]);
