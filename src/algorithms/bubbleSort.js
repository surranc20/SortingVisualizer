import { sleep } from "../helpers";
import {
  changeColor,
  swap,
  LOOKING_AT_COLOR,
  NORMAL_COLOR,
} from "./algoHelpers";

export const bubbleSort = async (array, delay, groupNum) => {
  const barRefs = document.getElementsByClassName(`Bar ${groupNum}`);
  for (let x = 0; x < array.length - 1; x++) {
    for (let y = 0; y < array.length - 1 - x; y++) {
      changeColor(y, barRefs, LOOKING_AT_COLOR);
      changeColor(y + 1, barRefs, LOOKING_AT_COLOR);
      await sleep(delay);
      if (array[y].val > array[y + 1].val) {
        await swap(array, y, y + 1, barRefs, delay);
      }
      changeColor(y, barRefs, NORMAL_COLOR);
      changeColor(y + 1, barRefs, NORMAL_COLOR);
    }
  }
};
