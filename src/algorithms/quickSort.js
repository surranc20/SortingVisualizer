import { sleep } from "../helpers";
import {
  changeColor,
  swap,
  LOOKING_AT_COLOR,
  NORMAL_COLOR,
} from "./algoHelpers";

export const quickSort = async (array, delay, groupNum) => {
  const barRefs = document.getElementsByClassName(`Bar ${groupNum}`);
  await quickSortHelper(array, 0, array.length - 1, delay, barRefs);
};

export const quickSortConcurrent = async (array, delay, groupNum) => {
  const barRefs = document.getElementsByClassName(`Bar ${groupNum}`);
  await quickSortHelperConcurrent(array, 0, array.length - 1, delay, barRefs);
};

const quickSortHelper = async (array, low, high, delay, barRefs) => {
  if (low < high) {
    const pivot = await partition(array, low, high, delay, barRefs);
    await quickSortHelper(array, low, pivot - 1, delay, barRefs);
    await quickSortHelper(array, pivot + 1, high, delay, barRefs);
  }
};

const quickSortHelperConcurrent = async (array, low, high, delay, barRefs) => {
  if (low < high) {
    const pivot = await partition(array, low, high, delay, barRefs);
    await Promise.all([
      quickSortHelperConcurrent(array, low, pivot - 1, delay, barRefs),
      quickSortHelperConcurrent(array, pivot + 1, high, delay, barRefs),
    ]);
  }
};

const partition = async (array, low, high, delay, barRefs) => {
  let pivot = array[high].val;
  let index = low - 1;

  changeColor(high, barRefs, LOOKING_AT_COLOR);
  for (let x = low; x < high; x++) {
    changeColor(x, barRefs, LOOKING_AT_COLOR);
    await sleep(delay);
    if (array[x].val < pivot) {
      index++;
      await swap(array, index, x, barRefs, delay);
    }
    changeColor(x, barRefs, NORMAL_COLOR);
  }
  changeColor(high, barRefs, NORMAL_COLOR);
  await swap(array, index + 1, high, barRefs, delay);
  return index + 1;
};
