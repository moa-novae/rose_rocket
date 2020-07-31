// find index of object with id x in array
export const indexOfObjectInArray = function (arr, id) {
  return arr.map((e) => e.id).indexOf(id);
};

export const isHexColour = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
