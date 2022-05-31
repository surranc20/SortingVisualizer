import { sleep } from "../helpers";
import {
  changeColor,
  changeHeight,
  LOOKING_AT_COLOR,
  NORMAL_COLOR,
} from "./algoHelpers";

export const mergeSort = async (array, delay, groupNum) => {
  const barRefs = document.getElementsByClassName(`Bar ${groupNum}`);
  await mergeSortHelper(array, 0, array.length - 1, delay, barRefs);
  console.log(array);
};

export const mergeSortHelper = async (array, low, high, delay, barRefs) => {
  if (low === high) {
    return;
  }
  const mid = Math.floor((low + high) / 2);
  await mergeSortHelper(array, low, mid, delay, barRefs);
  await mergeSortHelper(array, mid + 1, high, delay, barRefs);
  await merge(array, low, mid, high, delay, barRefs);
};

export const merge = async (array, low, mid, high, delay, barRefs) => {
  const firstHalf = array.slice(low, mid + 1);
  const secondHalf = array.slice(mid + 1, high + 1);

  let arrayP = low;
  let p1 = 0;
  let p2 = 0;

  while (p1 < firstHalf.length && p2 < secondHalf.length) {
    changeColor(low + p1, barRefs, LOOKING_AT_COLOR);
    changeColor(mid + p2, barRefs, LOOKING_AT_COLOR);
    await sleep(delay);

    if (firstHalf[p1].val < secondHalf[p2].val) {
      changeColor(low + p1, barRefs, NORMAL_COLOR);
      changeHeight(arrayP, barRefs, firstHalf[p1].val);
      await sleep(delay);

      array[arrayP] = firstHalf[p1];
      p1++;
    } else {
      changeColor(mid + p2, barRefs, NORMAL_COLOR);
      changeHeight(arrayP, barRefs, secondHalf[p2].val);
      await sleep(delay);

      array[arrayP] = secondHalf[p2];
      p2++;
    }
    arrayP++;
  }

  changeColor(low + p1, barRefs, NORMAL_COLOR);
  changeColor(mid + p2, barRefs, NORMAL_COLOR);

  while (p1 < firstHalf.length) {
    changeHeight(arrayP, barRefs, firstHalf[p1].val);
    await sleep(delay);

    array[arrayP] = firstHalf[p1];
    p1++;
    arrayP++;
  }

  while (p2 < secondHalf.length) {
    changeHeight(arrayP, barRefs, secondHalf[p2].val);
    await sleep(delay);

    array[arrayP] = secondHalf[p2];
    p2++;
    arrayP++;
  }
  await sleep(delay);
};
