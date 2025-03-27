// Import Express
const express = require('express');
const app = express();

// let data_obj = {
//   'workouts': []
// };

let workouts = [
  /*{
    workoutName: 'empty',
    secondsPerSet: '30',
    numSets: '1'
  },*/
];

// Define a route
app.get('/', (req, res) => {
  res.send('it works!' + workouts);
  console.log(workouts);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
  // console.log();
});
