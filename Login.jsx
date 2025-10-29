import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if(!email || !password) return alert('Enter email and password');

    // Try Supabase Auth sign in (if enabled)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (!error && data?.session) {
        // store user in localStorage
        const { data: userData } = await supabase.from('users').select('*').eq('email', email).single();
        localStorage.setItem('ys_user', JSON.stringify(userData));
        navigate('/');
        return;
      }
    } catch(e){
      // ignore and fallback to DB check
      console.warn(e);
    }

    // Fallback: check users table (demo)
    const { data, error } = await supabase.from('users').select('*').eq('email', email).limit(1).single();
    if(error || !data) return alert('No account found');
    if(data.password !== password) return alert('Incorrect password');
    localStorage.setItem('ys_user', JSON.stringify(data));
    navigate('/');
  };

  return (
    <div className='container'>
      <div className='card'>
        <h3>Login</h3>
        <input className='input' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} />
        <input className='input' placeholder='Password' type='password' value={password} onChange={e=>setPassword(e.target.value)} />
        <div style={{display:'flex',gap:8}}>
          <button className='button' onClick={handleLogin}>Login</button>
          <a className='link' href='/signup' style={{alignSelf:'center', marginLeft:8}}>Sign up</a>
        </div>
      </div>
    </div>
  );
}
