import { sleep } from "../helpers";
import {
  bubbleSort,
  mergeSort,
  quickSort,
  quickSortConcurrent,
  selectionSort,
} from "./";

export const LOOKING_AT_COLOR = "orange";
export const NORMAL_COLOR = "aquamarine";
export const SWAP_COLOR = "purple";

export const changeColor = (index, barRefs, color) => {
  barRefs[index].style.backgroundColor = color;
};

export const changeHeight = (index, barRefs, height) => {
  barRefs[index].style.height = height + "%";
};

export const swap = async (array, index1, index2, barRefs, delay) => {
  barRefs[index1].style.backgroundColor = SWAP_COLOR;
  barRefs[index2].style.backgroundColor = SWAP_COLOR;
  await sleep(delay);
  barRefs[index1].style.backgroundColor = NORMAL_COLOR;
  barRefs[index2].style.backgroundColor = NORMAL_COLOR;

  const height1 = barRefs[index1].style.height;
  const height2 = barRefs[index2].style.height;
  barRefs[index1].style.height = height2;
  barRefs[index2].style.height = height1;

  [array[index1], array[index2]] = [array[index2], array[index1]];
};

export const allSorted = (array, updateArray) => {
  array = array.map((barModel) => {
    barModel.success = true;
    return barModel;
  });
  updateArray(array);
};

export const sortingAlgosList = [
  "Bubble Sort",
  "Selection Sort",
  "Quick Sort",
  "Concurrent Quick Sort",
  "Merge Sort",
];

export const getAlgoFromString = (string) => {
  switch (string) {
    case "Bubble Sort":
      return bubbleSort;
    case "Selection Sort":
      return selectionSort;
    case "Quick Sort":
      return quickSort;
    case "Concurrent Quick Sort":
      return quickSortConcurrent;
    default:
      return mergeSort;
  }
};

export const sortingSpeeds = [
  [1000, "Very Slow"],
  [250, "Slow"],
  [50, "Normal"],
  [25, "Fast"],
  [5, "Very Fast"],
];

export const barNumberOptions = [5, 10, 20, 30, 40, 50, 75, 100, 150, 200, 300];
