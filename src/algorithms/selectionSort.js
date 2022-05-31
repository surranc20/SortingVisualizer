import { sleep } from "../helpers";
import {
  changeColor,
  swap,
  LOOKING_AT_COLOR,
  NORMAL_COLOR,
} from "./algoHelpers";

export const selectionSort = async (array, delay, groupNum) => {
  const barRefs = document.getElementsByClassName(`Bar ${groupNum}`);

  for (let x = 0; x < array.length; x++) {
    let currentMin = x;
    changeColor(currentMin, barRefs, LOOKING_AT_COLOR);
    for (let y = x + 1; y < array.length; y++) {
      changeColor(y, barRefs, LOOKING_AT_COLOR);
      await sleep(delay);
      if (array[y].val < array[currentMin].val) {
        changeColor(currentMin, barRefs, NORMAL_COLOR);
        currentMin = y;
        changeColor(currentMin, barRefs, LOOKING_AT_COLOR);
      }
      if (currentMin !== y) {
        changeColor(y, barRefs, NORMAL_COLOR);
      }
    }
    changeColor(currentMin, barRefs, NORMAL_COLOR);

    if (x !== currentMin) {
      await swap(array, x, currentMin, barRefs, delay);
    }
  }
};
