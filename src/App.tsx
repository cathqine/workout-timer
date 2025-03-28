import './App.css';
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Landing from './components/pages/Landing.tsx';
import Load from './components/pages/Load.tsx';
import LoadWorkouts from './components/pages/LoadWorkouts.tsx';
import WorkingOut from './components/pages/WorkingOut.tsx';
import Results from './components/pages/Results.tsx';
import Customs from './components/pages/Customs.tsx';
import NewWorkout from './components/pages/NewWorkout.tsx';

const Router = () => {
  return (
    <div className='center-contents flex-col'>
      <Link to={'/'} style={{ textDecoration: 'none' }}>
        <div className="title">Workout Timer</div>
      </Link>
      <div className="content flex-col" style={{ textAlign: "center" }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/load" element={<Load />} />
          <Route path="/load-workouts" element={<LoadWorkouts />} />
          <Route path="/new-workout" element={<NewWorkout />} />
          <Route path="/start-workout" element={<WorkingOut />} /> {/* hardcoded; it shuld be workout-start-:num */}
          <Route path="/results" element={<Results />} /> {/* hardcoded; it shuld be workout-start-:num */}
          <Route path="/customs" element={<Customs />} />
        </Routes>
      </div>
    </div>
  );
}
const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
export default App;