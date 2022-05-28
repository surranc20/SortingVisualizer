import { sleep } from "../models/helpers";

const LOOKING_AT_COLOR = "orange";
const NORMAL_COLOR = "aquamarine";
const SWAP_COLOR = "purple";

export const selectionSort = async (array, delay, groupNum) => {
  const indicesMap = createIndicesMap(array);
  const barRefs = document.getElementsByClassName(`Bar ${groupNum}`);

  for (let x = 0; x < array.length; x++) {
    let currentMin = x;
    changeColor(currentMin, barRefs, indicesMap, LOOKING_AT_COLOR);
    for (let y = x + 1; y < array.length; y++) {
      changeColor(y, barRefs, indicesMap, LOOKING_AT_COLOR);
      await sleep(delay);
      if (array[y].val < array[currentMin].val) {
        changeColor(currentMin, barRefs, indicesMap, NORMAL_COLOR);
        currentMin = y;
        changeColor(currentMin, barRefs, indicesMap, LOOKING_AT_COLOR);
      }
      if (currentMin !== y) {
        changeColor(y, barRefs, indicesMap, NORMAL_COLOR);
      }
    }
    changeColor(currentMin, barRefs, indicesMap, NORMAL_COLOR);

    if (x !== currentMin) {
      await swap(array, indicesMap, x, currentMin, barRefs, delay);
    }
  }
};

export const bubbleSort = async (array, delay, groupNum) => {
  debugger;
  const indicesMap = createIndicesMap(array);
  const barRefs = document.getElementsByClassName(`Bar ${groupNum}`);

  for (let x = 0; x < array.length - 1; x++) {
    for (let y = 0; y < array.length - 1 - x; y++) {
      if (array[y].val > array[y + 1].val) {
        await swap(array, indicesMap, y, y + 1, barRefs, delay);
      }
    }
  }
  console.log(array);
};

export const swap = async (
  array,
  indicesMap,
  index1,
  index2,
  barRefs,
  delay
) => {
  barRefs[indicesMap.get(index1)].style.backgroundColor = SWAP_COLOR;
  barRefs[indicesMap.get(index2)].style.backgroundColor = SWAP_COLOR;
  await sleep(delay);
  barRefs[indicesMap.get(index1)].style.backgroundColor = NORMAL_COLOR;
  barRefs[indicesMap.get(index2)].style.backgroundColor = NORMAL_COLOR;

  const height1 = barRefs[indicesMap.get(index1)].style.height;
  const height2 = barRefs[indicesMap.get(index2)].style.height;
  barRefs[indicesMap.get(index1)].style.height = height2;
  barRefs[indicesMap.get(index2)].style.height = height1;

  indicesMap.set(indicesMap.get(index1), indicesMap.get(index2));
  indicesMap.set(indicesMap.get(index2), indicesMap.get(index1));
  [array[index1], array[index2]] = [array[index2], array[index1]];
};

export const allSorted = (array, updateArray) => {
  array = array.map((barModel) => {
    barModel.success = true;
    return barModel;
  });
  updateArray(array);
};

const createIndicesMap = (array) => {
  const indicesMap = new Map();
  for (let x = 0; x < array.length; x++) {
    indicesMap.set(x, x);
  }
  return indicesMap;
};

const changeColor = (index, barRefs, indicesMap, color) => {
  barRefs[indicesMap.get(index)].style.backgroundColor = color;
};
