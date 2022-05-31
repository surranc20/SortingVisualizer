import { useState } from "react";
import { BarList } from "./components/barList";
import ActionsBar from "./components/ActionsBar";
import { generateInitialBars } from "./helpers";
import { sortingAlgosList, getAlgoFromString } from "./algorithms";
import "./css/App.css";

function App() {
  const [numBars, updateNumBars] = useState(50);
  const [selectedAlgo, updateSelectedAlgo] = useState(sortingAlgosList[0]);
  const [groupNum, updateGroupNum] = useState(0);
  const [bars, updateBars] = useState(generateInitialBars(numBars));
  const [isSorting, updateIsSorting] = useState(false);
  const [delay, updateDelay] = useState(50);

  const algoChanged = (newAlgo) => {
    updateSelectedAlgo(newAlgo);
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

  const startSorting = async () => {
    const tempGroupNum = groupNum;
    updateIsSorting(true);
    await getAlgoFromString(selectedAlgo)(bars, delay, tempGroupNum);
    updateIsSorting(false);
    updateGroupNum(tempGroupNum + 1);
  };

  return (
    <div className="App">
      <ActionsBar
        selectedAlgo={selectedAlgo}
        updateSelectedAlgo={algoChanged}
        delay={delay}
        updateDelay={updateDelay}
        numBars={numBars}
        updateNumBars={numBarsUpdated}
        startSorting={startSorting}
        isSorting={isSorting}
        generateNewArray={generateNewArray}
        menuItemClicked={menuItemClicked}
      ></ActionsBar>
      <div className="Content">
        <BarList initialBars={bars} groupNum={groupNum} />
      </div>
    </div>
  );
}

export default App;
