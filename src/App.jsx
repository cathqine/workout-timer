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
  CircularProgress,
  Typography,
  Box,
} from '@mui/material';
import useSound from 'use-sound';
// import start from './timer-start.mp3';
import bleep from './bleeps.wav';
import { useForm } from "react-hook-form";

/**
 * Time Helper Functions --- move to another file !!!!!!!!
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
 * Workout Timer !!
 */
function App() {
  // user customed - nums in terms of total num / total seconds
  const [numSets, setNumSets] = useState(3);
  const [totalSets, setTotalSets] = useState(numSets);
  const [work, setWork] = useState(40);
  const [rest, setRest] = useState(10);

  const [workObj, setWorkObj] = useState(secondsToMinutes(work));
  const [restObj, setRestObj] = useState(secondsToMinutes(rest));

  // Start/Stop Timer Button
  const [disabled, setDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Start");
  const [timerStart, setTimerStart] = useState(false);
  const [timerReset, setTimerReset] = useState(false);

  // based on user's choice - settings
  const [minutes, setMinutes] = useState(workObj.mins); // default
  const [seconds, setSeconds] = useState(workObj.secs); // default

  // working out timer start (true = working; false = resting/paused)
  const [workingOut, setWorkingOut] = useState(false);

  // settings & audio
  const [open, setOpen] = useState(false);
  const [playSound, { stop }] = useSound(bleep);

  let [timeoutID, setTimeoutID] = useState(0);

  /**
   * Circular Dialog... WIP
   */
  const [progress, setProgress] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(seconds);
  // CircleDialog.
  useEffect(() => {
    if (timerStart) {
      let timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            setProgress(seconds);
            setSecondsRemaining(0);
          } else {
            setProgress(prevProgress + 100 / work);
            setSecondsRemaining(seconds);
          }
          // (prevProgress >= 100 ? 0 : prevProgress + 100 / 5)
        }
        );
      }, 800);
      return () => {
        clearInterval(timer);
      };
    }
  }, []);

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
        let grabMinutes = Number(minutes);
        /**
         * Setting Seconds on the Timer
         */
        let grabSeconds = Number(seconds);
        if (grabSeconds === 0 && grabMinutes > 0) {
          grabMinutes -= 1;
          setMinutes(grabMinutes);
          grabSeconds = 60;
          setSeconds(grabSeconds);
        }
        setSeconds(grabSeconds - 1);
      }, 1000);
      remainingThreeSeconds();
    }
    return () => clearInterval(interval); // i still don't understand this uhhh
  }, [timerStart, seconds]);

  /*
   * Resetting Countdown of Timer
   */
  useEffect(() => {
    setTimerStart(false);
    stopTimer(); // see if works
    setTimerReset(false);
  }, [timerReset, open]);

  const startTimer = () => {
    if (numSets == totalSets) {
      playSound();
      setWorkingOut(true);
      setDisabled(true);
      // disable button
      setButtonText("Stop");
      timeoutID = setTimeout(() => {
        setTimerStart(true);
        setDisabled(false);
      }, 3500);
      setTimeoutID(timeoutID);
    } else {
      setButtonText("Stop");
      setTimerStart(true);
    }
    return stopTimer; // this is important?
  }

  // very important function for timer to move on to the next; also needs sets counter to be incorporated here
  const remainingThreeSeconds = () => {
    if (Number(minutes) === 0) { // therefore last couple of seconds
      if (Number(seconds) === 4) {
        playSound();
      }
      if (Number(seconds) === 0) { // and minutes is 0 (if minutes is not 0 then make seconds to 59)
        setTimeout(() => { // want to display the 0th second before proceeding
          nextTimer();
        }, 300);
        if (!workingOut) {
          setWorkingOut(true); // moving on to working out time.
        } else {
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

  // goes to next workout/rest timer.
  const nextTimer = () => {
    setTimerStart(false); // why?? ... oh setting a new timer i suppose?

    if (workingOut) {
      setWorkingOut(false);
      // setting display
      setMinutes(restObj.mins);
      setSeconds(restObj.secs);
      setNumSets(numSets - 1);
    } else {
      setWorkingOut(true);
      // setting display
      setMinutes(workObj.mins);
      setSeconds(workObj.secs);
    }

    // would expect the timer to still run.
    setTimerStart(true);

    // Finished Workout condition:
    if (numSets === 0) {
      alert("YOU COMPLETED YOUR WORKOUT, CONGRATS!");
      resetTimer();
      setNumSets(totalSets);
    }
  }

  const resetTimer = () => { // fully reset timer
    stop();
    setDisabled(false);
    stopTimer();
    setMinutes(workObj.mins);
    setSeconds(workObj.secs);
    setTimerStart(false);
    setTimerReset(true);
  }

  /**
   * Settings - Modal
   */

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

    console.log(data); // good.

    setNumSets(Number(data.sets));
    setTotalSets(Number(data.sets));

    setWork(Number(data.workout));
    setRest(Number(data.rest));

    setWorkObj(secondsToMinutes(data.workout));
    setRestObj(secondsToMinutes(data.rest));

    if (Number(data.sets) === numSets && Number(data.workout) === work && Number(data.rest) === rest) { // how to make it so that not need double click for it to work..
      if (Number(data.sets) > 0 && Number(data.workout) >= 0 && Number(data.rest) >= 0) {
        handleClose();
        resetTimer();
      }
    }
  }

  return (
    <>
      <h1> Workout Timer</h1>
      {/* display: 'infline-flex' */}
      <Box sx={{ position: 'relative', display: 'none' }}>
        <CircularProgress size="30em" variant="determinate" value={progress} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography fontSize="2em" variant="caption" component="div" color="black">
            {`${Math.round(secondsRemaining)}`}
          </Typography>
        </Box>
      </Box>
      <div className='center-align' style={{ margin: "0em 33.3em" }}>
        <div style={{ height: "15em", width: "25em", backgroundColor: "red", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
          <div>
            <i>{numSets} sets of {work}s workout with {rest}s rest in between</i>
          </div>
          <b style={{ fontSize: "2.5em" }}>{padding(minutes)} : {padding(seconds)}</b> {/* how to make minutes update after settings modal? */}
          <div style={{ height: "20%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

            {/* button text - start/stop */}
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
                      required
                      margin="dense"
                      id="sets"
                      label="Num of Sets"
                      type="number"
                      variant="standard"
                      defaultValue={3}
                      {...register("sets", {
                        validate: {
                          positive: v => parseInt(v) > 0,
                          lessThanTen: v => parseInt(v) < 10,
                          validateNumber: (_, values) =>
                            !!(values.number1 + values.number2),
                          checkUrl: async () => await fetch(),
                        },
                        required: true
                      })}
                    />
                    <TextField
                      margin="dense"
                      required
                      id="workout"
                      label="Workout Time/Set (s)"
                      type="number"
                      variant="standard"
                      defaultValue={40}
                      {...register("workout")}
                    />
                    <TextField
                      margin="dense"
                      required
                      id="rest"
                      label="Rest Time/Set (s)"
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
                    <Button type="submit" onClick={() => { onSubmit(); }}>Save</Button>
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
