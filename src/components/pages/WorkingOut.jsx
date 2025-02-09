import React, { useState, useEffect } from "react";
import Button from "../Button";
import Timer from "../Timer";

const WorkingOut = () => {
  let [text, setText] = useState("Pause");
  let [numSets, setNumSets] = useState(4);
  let [finish, setFinish] = useState(false);
  const [timerStart, setTimerStart] = useState(true);

  const handleClick = () => {
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
          <Button location="/" text="End" margin="0em auto 0em auto" type="border-rect-button"></Button> {/* would require specific button effects */}
        </div>
        <div className="default-div end-contents caption" style={{ margin: "1em", marginLeft: "0em", marginTop: "4.5em" }}>Sets left: {numSets}</div>
      </div>
    </>
  );
};
export default WorkingOut;