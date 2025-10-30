import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

export default function Verify(){
  const [code,setCode] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{},[]);

  const handleVerify = async () => {
    const pending = JSON.parse(localStorage.getItem('ys_pending') || 'null');
    if(!pending) return alert('No signup in progress');
    if(code !== pending.code) return alert('Incorrect code');

    // insert into Supabase users table
    const { data, error } = await supabase.from('users').insert([{
      name: pending.name,
      email: pending.email,
      password: pending.password,
      role: 'user',
      balance: 0
    }]);
    if(error) { console.error(error); return alert('Failed to create account'); }
    localStorage.removeItem('ys_pending');
    alert('Account verified and created. Please login.');
    navigate('/login');
  };

  return (
    <div className='container'>
      <div className='card'>
        <h3>Enter verification code</h3>
        <input className='input' placeholder='6-digit code' value={code} onChange={e=>setCode(e.target.value)} />
        <button className='button' onClick={handleVerify}>Verify & Create Account</button>
      </div>
    </div>
  );
  } 
