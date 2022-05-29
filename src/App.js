import "./App.css";
import { BarList } from "./barList";
import { generateRandomList } from "./models/helpers";
import BarModel from "./models/barModel";

import {
  bubbleSort,
  quickSort,
  quickSortConcurrent,
  selectionSort,
  testSwap,
} from "./algorithms/searchAlgos";

const numBars = 100;
const width = 100 / numBars.length;
const randomLyst = generateRandomList(numBars);
const initialBars = randomLyst.map((bar) => new BarModel(bar, width, "grey"));

function App() {
  return (
    <div className="App">
      <BarList
        initialBars={[...initialBars]}
        algo={quickSortConcurrent}
        groupNum={1}
      />
      <BarList initialBars={[...initialBars]} algo={quickSort} groupNum={2} />
    </div>
  );
}

export default App;
