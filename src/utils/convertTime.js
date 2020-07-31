export const timeRatio = {
  hour: 1,
  day: 24,
  week: 168,
  year: 8736,
};

export const convertTime = function (time, from, to) {
  return time * (timeRatio[from] / timeRatio[to]);
};

export const findDayFromTime = function (time) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[Math.floor((time % (24 * 7)) / 24)];
};
