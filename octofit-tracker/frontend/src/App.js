import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Teams from './components/Teams';
import Users from './components/Users';
import Activities from './components/Activities';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="/octofitapp-small.png" alt="OctoFit Logo" className="navbar-logo" />
              OctoFit Tracker
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">Workouts</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <div className="container mt-5">
              <div className="jumbotron p-5">
                <h1 className="display-4 fw-bold mb-4">Welcome to OctoFit Tracker</h1>
                <p className="lead mb-4">Track your fitness activities and compete with your team!</p>
                <hr className="my-4" />
                <p className="mb-4">Use the navigation menu above to explore teams, users, activities, workouts, and the leaderboard.</p>
                <div className="d-grid gap-2 d-md-flex">
                  <Link className="btn btn-primary btn-lg" to="/teams" role="button">
                    <i className="bi bi-people-fill me-2"></i>View Teams
                  </Link>
                  <Link className="btn btn-outline-primary btn-lg" to="/workouts" role="button">
                    <i className="bi bi-lightning-fill me-2"></i>Browse Workouts
                  </Link>
                </div>
              </div>
            </div>
          } />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
