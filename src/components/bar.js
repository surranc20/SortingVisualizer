import "../css/App.css";
import React from "react";

const Bar = ({ val, width, groupNum }) => {
  const style = {
    height: `${val}%`,
    width: `${width}%`,
  };
  return <div className={`Bar ${groupNum}`} style={style}></div>;
};

export default Bar;
export const MemoizedBar = React.memo(Bar);
