import React from "react";
import LeftPane from "./LeftPane.js";
import RightPane from "./RightPane.js";

const CV = ({ dataHistory }) => {
  return (
    <div className="CV">
      <LeftPane dataHistory={dataHistory} />
      <RightPane dataHistory={dataHistory} />
    </div>
  );
};

export default CV;
