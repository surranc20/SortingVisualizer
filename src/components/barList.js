import { MemoizedBar } from "../bar";

export const BarList = ({ initialBars, groupNum }) => {
  return (
    <div className="BarList">
      {initialBars.map((barModel, index) => (
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
