import _ from "lodash";

export const generateRandomList = (size) => {
  const lyst = [];
  for (let x = 0; x < size; x++) {
    lyst.push(_.random(1, 100));
  }
  return lyst;
};

export const generateRandomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
