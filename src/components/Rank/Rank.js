import React from "react";

const Rank = props => {
  return (
    <div className="">
      <div className="white f3">
        {`${props.name} , your current entry count...`}
      </div>
      <div className="white f1">{props.entries}</div>
    </div>
  );
};

export default Rank;
