import React from "react";
import Button from "../Button";
import Summary from "../Summary";

const Results = () => {
  return (
    <div className="default-div">
      <div className="caption"> Workout Summary </div>
      <div className="default-div" style={{ marginTop: "6em" }}>
        <Summary sets="4" mins="6" />
        <div className="caption center-contents"> Great work! </div>
        <div className="default-div flex-row" style={{ justifyContent: "start" }}>
          <Button margin="0em 1em 0em auto" location="/workout-start-0" text="Go again?" type="thin-rect-button"></Button> {/* would require specific button effects */}
          <Button margin="0em auto 0em 0em" location="/" text="Exit" type="thin-rect-button"></Button> {/* would require specific button effects */}
        </div>
      </div>

    </div>
  );
}

export default Results;