import "./App.css";
import { BarList } from "./barList";
import { generateRandomList } from "./models/helpers";
import BarModel from "./models/barModel";

import {
  bubbleSort,
  quickSort,
  quickSortConcurrent,
  selectionSort,
  mergeSort,
} from "./algorithms/searchAlgos";

const numBars = 200;
const width = 100 / numBars.length;
const randomLyst = generateRandomList(numBars);
const initialBars = randomLyst.map((bar) => new BarModel(bar, width, "grey"));

function App() {
  return (
    <div className="App">
      <BarList initialBars={[...initialBars]} algo={mergeSort} groupNum={1} />
    </div>
  );
}

export default App;
