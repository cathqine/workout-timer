import React, { ReactElement } from "react";
import Button from "../Button.tsx";
import Summary from "../Summary.tsx";

const Results = (): ReactElement => {
  const closeApp = (): void => {
    window.open("about:blank", "_self");
    window.close();
  }
  return (
    <div className="default-div">
      <div className="caption"> Workout Summary </div>
      <div className="default-div" style={{ marginTop: "6em" }}>
        <Summary sets="4" mins="6" />
        <div className="caption center-contents"> Great work! </div>
        <div className="default-div flex-row" style={{ justifyContent: "start" }}>
          <Button margin="0em 1em 0em auto" location="/workout-start-0" text="Go again?" type="thin-rect-button"></Button>
          <button className={`button-grow center-contents thin-rect-button`} style={{ margin: "0em auto 0em auto" }} onClick={closeApp}>
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;