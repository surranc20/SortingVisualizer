import "./App.css";
import { BarList } from "./components/barList";
import ActionsBar from "./components/ActionsBar";
import { useState } from "react";
import { generateInitialBars } from "./helpers";
import {
  bubbleSort,
  mergeSort,
  quickSort,
  quickSortConcurrent,
  selectionSort,
  getSortingAlgos,
} from "./algorithms";

import { useEffect } from "react";

const algos = getSortingAlgos();

function App() {
  const [numBars, updateNumBars] = useState(50);
  const [selectedAlgo, updateSelectedAlgo] = useState(algos[0]);
  const [groupNum, updateGroupNum] = useState(0);
  const [bars, updateBars] = useState(generateInitialBars(numBars));
  const [isSorting, updateIsSorting] = useState(false);
  const [delay, updateDelay] = useState(50);

  const algoChanged = (newAlgo) => {
    updateSelectedAlgo(newAlgo);
  };

  const startSorting = async () => {
    const tempGroupNum = groupNum;
    updateGroupNum(tempGroupNum + 1);
  };

  const generateNewArray = (numBarsToUse = numBars) => {
    updateBars(generateInitialBars(numBarsToUse));
  };

  const numBarsUpdated = (newNumBars) => {
    updateNumBars(newNumBars);
    generateNewArray(newNumBars);
  };

  const menuItemClicked = (algoSelected) => {
    updateSelectedAlgo(algoSelected);
    startSorting();
  };

  useEffect(() => {
    const closure = async () => {
      if (groupNum === 0) return;
      updateIsSorting(true);
      await getAlgoFromString(selectedAlgo)(bars, delay, groupNum);
      updateIsSorting(false);
    };
    closure();
  }, [groupNum]);

  return (
    <div className="App">
      <ActionsBar
        parentSelectedAlgo={algoChanged}
        startSorting={startSorting}
        isSorting={isSorting}
        generateNewArray={generateNewArray}
        numBars={numBars}
        updateNumBars={numBarsUpdated}
        delay={delay}
        updateDelay={updateDelay}
        menuItemClicked={menuItemClicked}
      ></ActionsBar>
      <div className="Content">
        <BarList initialBars={bars} groupNum={groupNum} />
      </div>
    </div>
  );
}

const getAlgoFromString = (string) => {
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

export default App;
