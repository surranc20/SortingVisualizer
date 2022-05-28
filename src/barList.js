import { MemoizedBar } from "./bar";
import { useEffect, useState } from "react";

import { generateRandomList } from "./models/helpers";
import BarModel from "./models/barModel";
import { bubbleSort, selectionSort } from "./algorithms/linearSearch";

export const BarList = () => {
  const numBars = 10;
  const width = 100 / numBars.length;
  const randomLyst = generateRandomList(numBars);
  const initialBars1 = randomLyst.map(
    (bar) => new BarModel(bar, width, "grey")
  );
  const [bars, updateBars] = useState(initialBars1);

  useEffect(() => {
    selectionSort(bars, 1, 1);
  }, []);

  return (
    <div className="BarList">
      {bars.map((barModel, index) => (
        <MemoizedBar
          val={barModel.val}
          width={barModel.width}
          selected={barModel.selected}
          success={barModel.success}
          groupNum={1}
          key={index}
        ></MemoizedBar>
      ))}
    </div>
  );
};
