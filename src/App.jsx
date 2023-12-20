import React, { useState, useEffect } from 'react';
import {
  Stack,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField,
  DialogActions,
  Button
} from '@mui/material';
import useSound from 'use-sound';
import start from './timer-start.mp3';
import { useForm } from "react-hook-form";

// import Settings from './components/Settings';
const onSubmit = data => console.log(data);


function App() {
  // user customed
  const [numSets, setNumSets] = useState(3);
  const [work, setWork] = useState(40);
  const [rest, setRest] = useState(10);

  const defaultWorkoutMinutes = "00"; // change to useState when user goes to settings, etc.
  const defaultWorkoutSeconds = "40";

  const defaultRestMinutes = "00"; // see previous comment
  const defaultRestSeconds = "10";

  const [disabled, setDisabled] = useState(false);

  const [buttonText, setButtonText] = useState("Start");
  const [timerStart, setTimerStart] = useState(false);

  const [totalTime, setTotalTime] = useState(40); // based on user's choice - settings
  const [minutes, setMinutes] = useState("00"); // default
  const [seconds, setSeconds] = useState("10"); // default

  const [workingOut, setWorkingOut] = useState(false);

  const [open, setOpen] = useState(false);
  const [playSound, { stop }] = useSound(start);

  let timeoutID = 0;

  const padding = (num) => {
    if (num < 10) {
      return "0" + num;
    }
    return String(num);
  }

  useEffect(() => {
    let interval = 0;
    if (timerStart) {
      interval = window.setInterval(() => {
        let grabSeconds = Number(seconds); // need to make sure padding is done as well
        setSeconds(padding(grabSeconds - 1));
      }, 1000);
      remainingThreeSeconds();
    }
    return () => clearInterval(interval); // i still don't understand this uhhh
  }, [timerStart, seconds]);

  const secondsToMinutes = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = Math.ceil(sec % 60);

    return {
      "mins": mins,
      "secs": secs
    }
  }

  const startTimer = () => {
    playSound();
    setWorkingOut(true);
    setDisabled(true);
    // disable button
    setButtonText("Stop");
    timeoutID = setTimeout(() => {
      setTimerStart(true);
      setDisabled(false);
    }, 3500);
    return stopTimer; // this is important?
  }

  const remainingThreeSeconds = () => {
    if (Number(seconds) == 3) {
      playSound();
    }
    if (Number(seconds) == 0) { // and minutes is 0 (if minutes is not 0 then make seconds to 59)
      nextTimer();
      if (!workingOut) {
        setWorkingOut(true); // moving on to working out time.
      } else if (workingOut) {
        setWorkingOut(false); // moving on to break time.
      }
    }
  }

  const stopTimer = () => {
    // disable button
    clearTimeout(timeoutID);
    stop();
    setButtonText("Start");
    setTimerStart(false);
  }

  const nextTimer = () => {
    setTimerStart(false);
    setMinutes(defaultRestMinutes);
    setSeconds(defaultRestSeconds);
    // would expect the timer to still run.
    setTimerStart(true);
  }

  const resetTimer = () => { // fully reset timer
    setTimerStart(false);
    setButtonText("Start");
    setMinutes(defaultWorkoutMinutes);
    setSeconds(defaultWorkoutSeconds);
  }

  const openModal = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <h1> Workout Timer</h1>
      <div className='center-align' style={{ margin: "0em 33.3em" }}>
        <div style={{ height: "15em", width: "25em", backgroundColor: "red", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
          <div>
            <i>{numSets} sets of {work}s workout with {rest}s rest in between</i>
          </div>
          <b style={{ fontSize: "2.5em" }}>{minutes} : {seconds}</b>
          <div style={{ height: "20%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Stack direction="row" style={{ margin: "auto" }}>
              <button disabled={disabled} style={{ alignSelf: "center", width: "5em" }} onClick={timerStart ? stopTimer : startTimer}>
                {buttonText}
              </button>
              <button style={{ alignSelf: "center", width: "5em" }} onClick={resetTimer}>Reset</button>
            </Stack>

            <div style={{ position: "relative", bottom: "0px", width: "100%", height: "1em", textAlign: "right" }}>
              <img style={{
                width: "1.4em",
                marginRight: "3em"
              }} src="https://icons.veryicon.com/png/o/miscellaneous/ionicons-1/ios-settings-5.png"
                alt="settings"
                onClick={openModal}>
              </img>
              {/* <Settings open={open} onClose={handleClose} func={get_data} /> */}

              <form onSubmit={handleSubmit(onSubmit)}>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Timer Settings</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Customise your number of sets, and time.
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="sets"
                      label="Num of Sets"
                      type="number"
                      variant="standard"
                      defaultValue={3}
                    />
                    <TextField
                      margin="dense"
                      id="workout"
                      label="Workout Time"
                      type="number"
                      variant="standard"
                      defaultValue={40}
                    />
                    <TextField
                      margin="dense"
                      id="rest"
                      label="Rest Time"
                      type="number"
                      variant="standard"
                      defaultValue={10}
                    />
                  </DialogContent>

                  <DialogTitle>Audio Settings</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Select your preferred audio.
                    </DialogContentText>
                  </DialogContent>
                  {/* add audio clips for user to change... */}
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={onSubmit}>Save</Button>
                  </DialogActions>
                </Dialog>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
