import _ from "lodash";
import BarModel from "./barModel";

export const generateRandomList = (size) => {
  const lyst = [];
  for (let x = 0; x < size; x++) {
    lyst.push(_.random(1, 100));
  }
  return lyst;
};

export const generateInitialBars = (numBars) => {
  const width = 100 / numBars.length;
  const randomLyst = generateRandomList(numBars);
  return randomLyst.map((bar) => new BarModel(bar, width, "grey"));
};

export const generateRandomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
