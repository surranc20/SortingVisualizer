import { sleep } from "../models/helpers";

const LOOKING_AT_COLOR = "orange";
const NORMAL_COLOR = "aquamarine";
const SWAP_COLOR = "purple";

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

export const bubbleSort = async (array, delay, groupNum) => {
  const barRefs = document.getElementsByClassName(`Bar ${groupNum}`);
  console.log(barRefs);
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

export const quickSort = async (array, delay, groupNum) => {
  const barRefs = document.getElementsByClassName(`Bar ${groupNum}`);
  await quickSortHelper(array, 0, array.length - 1, delay, barRefs);
};

export const quickSortConcurrent = async (array, delay, groupNum) => {
  const barRefs = document.getElementsByClassName(`Bar ${groupNum}`);
  await quickSortHelperConcurrent(array, 0, array.length - 1, delay, barRefs);
};

export const quickSortHelper = async (array, low, high, delay, barRefs) => {
  if (low < high) {
    const pivot = await partition(array, low, high, delay, barRefs);
    await quickSortHelper(array, low, pivot - 1, delay, barRefs);
    await quickSortHelper(array, pivot + 1, high, delay, barRefs);
  }
};

export const quickSortHelperConcurrent = async (
  array,
  low,
  high,
  delay,
  barRefs
) => {
  if (low < high) {
    const pivot = await partition(array, low, high, delay, barRefs);
    await Promise.all([
      quickSortHelperConcurrent(array, low, pivot - 1, delay, barRefs),
      quickSortHelperConcurrent(array, pivot + 1, high, delay, barRefs),
    ]);
  }
};

export const partition = async (array, low, high, delay, barRefs) => {
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

// export const testSwap = async (array, delay, groupNum) => {
//   const barRefs = document.getElementsByClassName(`Bar ${groupNum}`);

//   for (let x = 0; x < array.length - 1; x++) {
//     await swap(array, x, x + 1, barRefs, delay);
//   }
// };

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

export const allSorted = (array, updateArray) => {
  array = array.map((barModel) => {
    barModel.success = true;
    return barModel;
  });
  updateArray(array);
};

const changeColor = (index, barRefs, color) => {
  barRefs[index].style.backgroundColor = color;
};

const changeHeight = (index, barRefs, height) => {
  barRefs[index].style.height = height + "%";
};

export const getSortingAlgos = () => {
  return [
    "Bubble Sort",
    "Selection Sort",
    "Quick Sort",
    "Concurrent Quick Sort",
    "Merge Sort",
  ];
};
