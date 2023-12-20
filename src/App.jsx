import React, { useState, useEffect } from 'react';
import {
  Stack,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import useSound from 'use-sound';
import start from './timer-start.mp3';
import { useForm } from "react-hook-form";

/**
 * Time Helper Functions
 */
const secondsToMinutes = (sec) => {
  const mins = Math.floor(sec / 60);
  const secs = Math.ceil(sec % 60);

  return {
    "mins": Number(mins),
    "secs": Number(secs)
  }
}

const padding = (num) => {
  if (num === 0) {
    return String("00");
  }
  if (num < 10) {
    return "0" + num;
  }
  return String(num);
}

/**
 * Workout Timer
 */
function App() {
  // user customed - nums in terms of total num / total seconds
  const [numSets, setNumSets] = useState(3);
  const [work, setWork] = useState(20);
  const [rest, setRest] = useState(10);

  const workObj = secondsToMinutes(work); // useEffect
  const restObj = secondsToMinutes(rest); // useEffect

  // Start/Stop Timer Button
  const [disabled, setDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Start");
  const [timerStart, setTimerStart] = useState(false);

  // based on user's choice - settings
  const [totalTime, setTotalTime] = useState(work); // num in terms of total seconds
  const [minutes, setMinutes] = useState(workObj.mins); // default
  const [seconds, setSeconds] = useState(workObj.secs); // default

  // working out timer start (true = working; false = resting/paused)
  const [workingOut, setWorkingOut] = useState(false);

  // settings & audio
  const [open, setOpen] = useState(false);
  const [playSound, { stop }] = useSound(start);

  let timeoutID = 0;

  // Timer
  useEffect(() => {
    let interval = 0;
    if (timerStart) {
      interval = window.setInterval(() => {
        let grabMinutes = Number(minutes);
        setMinutes(padding(grabMinutes));
        let grabSeconds = Number(seconds); // need to make sure padding is done as well
        if (grabSeconds === 0 && grabMinutes > 0) {
          grabMinutes -= 1;
          setMinutes(padding(grabMinutes));
          grabSeconds = 60;
          setSeconds(padding(grabSeconds));
        }
        setSeconds(padding(grabSeconds - 1));
      }, 1000);
      remainingThreeSeconds();
    }
    return () => clearInterval(interval); // i still don't understand this uhhh
  }, [timerStart, seconds]);

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

  // very important function for timer to move on to the next; also needs sets counter to be incorporated here
  const remainingThreeSeconds = () => {
    if (Number(minutes) === 0) { // therefore last couple of seconds
      if (Number(seconds) === 3) {
        playSound();
      }
      if (Number(seconds) === 0) { // and minutes is 0 (if minutes is not 0 then make seconds to 59)
        setTimeout(() => { // want to display the 0th second before proceeding
          nextTimer();
        }, 500);
        if (!workingOut) {
          setWorkingOut(true); // moving on to working out time.
        } else if (workingOut) {
          setWorkingOut(false); // moving on to break time.
        }
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
    setMinutes(restObj.mins);
    setSeconds(restObj.secs);
    // would expect the timer to still run.
    setTimerStart(true);
  }

  const resetTimer = () => { // fully reset timer
    setTimerStart(false);
    setButtonText("Start");
    setMinutes(workObj.mins);
    setSeconds(workObj.secs);
  }

  const openModal = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      sets: '',
      workout: '',
      rest: '',
    }
  });

  // settings form on submit, changes the values based on whatever (these are the starting numbers).
  const onSubmit = () => {
    const data = getValues();
    console.log(data);
    setNumSets(data.sets);
    setWork(data.workout);
    setRest(data.rest);
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
              <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                      {...register("sets")}
                    />
                    <TextField
                      margin="dense"
                      id="workout"
                      label="Workout Time"
                      type="number"
                      variant="standard"
                      defaultValue={40}
                      {...register("workout")}
                    />
                    <TextField
                      margin="dense"
                      id="rest"
                      label="Rest Time"
                      type="number"
                      variant="standard"
                      defaultValue={10}
                      {...register("rest")}
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
                    <Button type="submit" onClick={() => { onSubmit(); handleClose(); }}>Save</Button>
                  </DialogActions>
                </form>
              </Dialog>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default App;
