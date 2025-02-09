import './App.css';
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Landing from "./components/pages/Landing";
import Load from './components/pages/Load';
import LoadWorkouts from './components/pages/LoadWorkouts';
import WorkingOut from './components/pages/WorkingOut';
import Results from './components/pages/Results';

const Router = () => {
  return (
    <>
      <Link to={'/'} style={{ textDecoration: 'none' }}>
        <div className="title">Workout Timer</div>
      </Link>
      <div className="content flex-col" style={{ textAlign: "center" }}>
        <Routes>
          <Route path="/" element=<Landing /> />
          <Route path="/load" element=<Load /> />
          <Route path="/load-workouts" element=<LoadWorkouts /> />
          <Route path="/workout-start-0" element=<WorkingOut /> /> {/* hardcoded; it shuld be workout-start-:num */}
          <Route path="/results" element=<Results /> /> {/* hardcoded; it shuld be workout-start-:num */}
        </Routes>
      </div>
    </>
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