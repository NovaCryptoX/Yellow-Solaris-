import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Signup from './Signup';
import Verify from './Verify';
import Login from './Login';
import Admin from './Admin';

export default function App(){
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/verify' element={<Verify/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/admin' element={<Admin/>} />
      </Routes>
    </Router>
  );
          }
