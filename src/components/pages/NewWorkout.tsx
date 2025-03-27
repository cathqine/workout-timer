import React, { useEffect, useState } from "react";
import { ReactElement } from "react";
import Button from "../Button.tsx";

let NewWorkout = (): ReactElement => {
  const [text, setText] = useState<string>("Edit");
  const [disabled, setDisabled] = useState<boolean>(true);

  const [location, setLocation] = useState<string>('/');

  let [num, setNum] = useState<string>('4');
  let [speed, setSpeed] = useState<string>('40');

  useEffect(() => {
    setNum(JSON.parse(localStorage.getItem('num sets')!));
    setSpeed(JSON.parse(localStorage.getItem('seconds per set')!));
  }, []);

  const toggleSaveEdit = (): void => {
    if (text === "Save") {
      setText("Edit");
      setDisabled(true);
      setLocation('/start-workout');
      // setLocation('start-workout/' + localStorage.getItem('workout name')!);
    }
    else if (text === "Edit") {
      setText("Save");
      setDisabled(false);
      // get input to focus when here.
    }
  }

  useEffect(() => {
    localStorage.setItem('workout name', 'default');
  }, [])

  const collectText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const workoutName = event?.target.value;
    localStorage.setItem('workout name', workoutName);
  }

  return (
    <>
      <div className="caption">Workout Details</div>

      <div className="default-div" style={{ fontSize: "2.5em", textAlign: "start", margin: "0em 0em 1em 1em" }}>
        <div className="default-div">{num} sets</div>
        <div className="default-div">{speed} seconds/set</div>
      </div>

      <div className="flex-row default-div" style={{ margin: "0em 0em 0em 2.7em" }}>
        <input autoFocus id="workout-name" onChange={collectText} disabled={disabled} placeholder="untitled" maxLength={14} type="text" style={{ fontSize: "2em", width: "11.5em", height: "1.75em", textAlign: "center" }}></input>
        <button className={`button-grow save-edit-button`} onClick={toggleSaveEdit}>
          {text}
        </button>
      </div>

      <Button margin="6em auto 0em auto" location={location} text="Start" type="thin-rect-button"></Button>
    </>
  );
}

export default NewWorkout;