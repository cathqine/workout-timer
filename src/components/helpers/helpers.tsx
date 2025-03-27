interface MinsSecsType {
  mins: number;
  secs: number;
}

export const secondsToMinutes = (sec: number): MinsSecsType => {
  const mins = Math.floor(sec / 60);
  const secs = Math.ceil(sec % 60);

  return {
    "mins": Number(mins),
    "secs": Number(secs)
  }
}

export const padding = (num: number): String => {
  if (num === 0) {
    return String("00");
  }
  if (num < 10) {
    return "0" + num;
  }
  return String(num);
}

// // very important function for timer to move on to the next; also needs sets counter to be incorporated here
// export const remainingThreeSeconds = () => {
//   if (Number(minutes) === 0) { // therefore last couple of seconds
//     if (Number(seconds) === 4) {
//       playSound();
//     }
//     if (Number(seconds) === 0) { // and minutes is 0 (if minutes is not 0 then make seconds to 59)
//       setTimeout(() => { // want to display the 0th second before proceeding
//         nextTimer();
//       }, 300);
//       if (!workingOut) {
//         setWorkingOut(true); // moving on to working out time.
//       } else {
//         setWorkingOut(false); // moving on to break time.
//       }
//     }
//   }
// }