import { MemoizedBar } from "./bar";
import { useEffect, useState } from "react";

export const BarList = ({ algo, initialBars, groupNum }) => {
  const [bars, updateBars] = useState(initialBars);

  useEffect(() => {
    algo(bars, 20, groupNum);
  }, []);

  return (
    <div className="BarList">
      {bars.map((barModel, index) => (
        <MemoizedBar
          val={barModel.val}
          width={barModel.width}
          selected={barModel.selected}
          success={barModel.success}
          groupNum={groupNum}
          key={index}
        ></MemoizedBar>
      ))}
    </div>
  );
};
