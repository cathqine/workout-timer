import React from "react";

const Summary = (props) => {
  return (
    <div className="default-div" style={{ fontSize: "3.1em" }}>
      <div className="default-div">{props.sets} sets in</div>
      <div className="default-div">{props.mins} minutes</div>
    </div>
  );
}

export default Summary;