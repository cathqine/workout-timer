import React, { ReactElement } from "react";
import Button from "../Button.tsx";
import Summary from "../Summary.tsx";
import { secondsToMinutes } from "../helpers/helpers.tsx";

const Results = (): ReactElement => {
  /* End of program - exits program */
  // const closeApp = (): void => {
  //   window.open("about:blank", "_self");
  //   window.close();
  // }
  // <button className={`button-grow center-contents thin-rect-button`} style={{ margin: "0em auto 0em auto" }} onClick={closeApp}>
  //   Exit
  // </button>
  ;


  const totalTime = Number(localStorage.getItem('seconds per set')) * Number(localStorage.getItem('num sets')) / 60;

  return (
    <div className="default-div">
      <div className="caption"> Workout Summary </div>
      <div className="default-div" style={{ marginTop: "6em" }}>
        <Summary sets={JSON.parse(localStorage.getItem('num sets')!)} mins={totalTime.toFixed(2)} />
        <div className="caption center-contents"> Great work! </div>
        <div className="default-div flex-row" style={{ justifyContent: "start" }}>
          {/* note: change the location for the button right below here */}
          <Button margin="0em 1em 0em auto" location="/start-workout" text="Go again?" type="thin-rect-button"></Button>
          <Button margin="0em 1em 0em auto" location="/" text="Menu" type="thin-rect-button"></Button>
        </div>
      </div>
    </div>
  );
}

export default Results;