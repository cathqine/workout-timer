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

function App() {
  const [num, setNum] = useState(3);
  const [work, setWork] = useState(40);
  const [rest, setRest] = useState(10);

  const [buttonText, setButtonText] = useState("Start");
  const [timerStart, setTimerStart] = useState(false);

  const [totalTime, setTotalTime] = useState(40);
  const [minutes, setMinutes] = useState("00"); // default
  const [seconds, setSeconds] = useState("40"); // default

  const defaultMinutes = "00";
  const defaultSeconds = "40";

  const [open, setOpen] = useState(false);
  // const [playSound] = useSound(start); // four seconds remaining
  const [playSound, { stop }] = useSound(start);

  let timeoutID = 0;

  useEffect(() => {
    let interval = 0;
    if (timerStart) {
      interval = window.setInterval(() => {
        let grabSeconds = Number(seconds); // need to make sure padding is done as well
        setSeconds(grabSeconds - 1);
      }, 1000);
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
    // disable button
    setButtonText("Stop");
    timeoutID = setTimeout(() => {
      setTimerStart(true);
    }, 3500);
    return stopTimer; // this is important?
  }

  const stopTimer = () => {
    // disable button
    clearTimeout(timeoutID);
    stop();
    setButtonText("Start");
    setTimerStart(false);
  }

  const resetTimer = () => {
    setTimerStart(false);
    setButtonText("Start");
    setMinutes(defaultMinutes);
    setSeconds(defaultSeconds);
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
            <i>{num} sets of {work}s workout with {rest}s rest in between</i>
          </div>
          <b style={{ fontSize: "2.5em" }}>{minutes} : {seconds}</b>
          <div style={{ height: "20%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Stack direction="row" style={{ margin: "auto" }}>
              <button style={{ alignSelf: "center", width: "5em" }} onClick={timerStart ? stopTimer : startTimer}>
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

              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
