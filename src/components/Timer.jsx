import React, { useState, useEffect } from "react";
import { padding } from "./helpers/helpers";
import { useNavigate } from "react-router-dom";

const Timer = (props) => {
  const navigate = useNavigate();

  let setNumSets = props.setNumSets;
  let numSets = props.numSets;
  let setFinish = props.setFinish;
  let finish = props.finish;
  let timerStart = props.timerStart;

  // let [timeoutID, setTimeoutID] = useState(0);

  let [minutes, setMinutes] = useState(0);
  let [displayMins, setDisplayMins] = useState(minutes);

  let [seconds, setSeconds] = useState(3);
  let [displaySecs, setDisplaySecs] = useState(seconds);

  /*
   * Timer Countdowns
   */
  useEffect(() => {
    let interval = 0;
    if (timerStart) {
      interval = window.setInterval(() => {
        /**
         * Setting Minutes on the Timer
         */
        let grabMinutes = Number(displayMins);
        /**
         * Setting Seconds on the Timer
         */
        let grabSeconds = Number(displaySecs);
        if (grabSeconds === 0 && grabMinutes > 0) {
          grabMinutes -= 1;
          setDisplayMins(grabMinutes);
          grabSeconds = 60;
          setDisplaySecs(grabSeconds);
        }
        if (grabSeconds > 0 && grabMinutes >= 0) {
          setDisplaySecs(grabSeconds - 1);
        } else if (numSets > 0 && grabSeconds >= 0 && grabMinutes >= 0) { // all seconds up - start the next set
          setNumSets((prevSet) => prevSet - 1);
          numSets -= 1; // how come it does not update by itself?

          setDisplayMins(minutes);
          setDisplaySecs(seconds);
        } else { // finished.
          setFinish(true);
        }
      }, 1000);
      // remainingThreeSeconds();
    }
    return () => clearInterval(interval);
  }, [timerStart, displaySecs]);

  useEffect(() => {
    setFinish(false);
    if (finish) {
      navigate("/results");
    }
  }, [finish]);

  return (
    <>
      <div className="time">
        {padding(displayMins)}:{padding(displaySecs)}
      </div>
    </>
  );
}

export default Timer;