import "./App.css";
import React from "react";

const Bar = ({ val, width, selected, success, groupNum }) => {
  const style = {
    height: `${val}%`,
    width: `${width}%`,
  };
  return (
    <div
      className={`Bar ${groupNum} ${selected && "Selected"} ${
        success && "Success"
      }`}
      style={style}
    ></div>
  );
};

export default Bar;
export const MemoizedBar = React.memo(Bar);
