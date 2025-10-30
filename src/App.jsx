import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import Admin from './Admin.jsx';
import Verify from './Verify.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
    </Router>
  );
}

export default App;
