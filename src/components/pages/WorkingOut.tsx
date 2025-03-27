import React, { useState, useEffect, ReactElement } from "react";
import Button from "../Button.tsx";
import Timer from "../Timer.tsx";

const WorkingOut = (): ReactElement => {
  let [text, setText] = useState<string>("Pause");
  let [numSets, setNumSets] = useState<number>(Number(localStorage.getItem('num sets')));
  let [finish, setFinish] = useState<boolean>(false);
  const [timerStart, setTimerStart] = useState<boolean>(true);

  const handleClick = (): void => {
    if (text === "Pause") {
      setText("Resume");
      setTimerStart(false);
    }
    else if (text === "Resume") {
      setText("Pause");
      setTimerStart(true);
    }
  }

  return (
    <>
      <div className="caption" style={{ textAlign: "center" }}>Let's start working out!</div>
      <Timer timerStart={timerStart} setNumSets={setNumSets} numSets={numSets} setFinish={setFinish} finish={finish} />

      <button className={`button-grow center-contents thin-rect-button`} style={{ margin: "0em auto 0em auto" }} onClick={handleClick}>
        {text}
      </button>

      <div style={{ justifyContent: "space-between" }} className="flex-row default-div">
        <div style={{ margin: "1em" }} className="default-div end-contents">
          {/* this button below specifically needs a counting record of how many sets done & how much time has gone by */}
          <Button location="/results" text="End" margin="0em auto 0em auto" type="border-rect-button"></Button> {/* would require specific button effects */}
        </div>
        <div className="default-div end-contents caption" style={{ margin: "1em", marginLeft: "0em", marginTop: "4.5em" }}>Sets left: {numSets}</div>
      </div>
    </>
  );
};
export default WorkingOut;