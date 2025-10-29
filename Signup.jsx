import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';

export default function Signup(){
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();

  const generateCode = () => Math.floor(100000 + Math.random()*900000).toString();

  const handleSignup = async () => {
    if(!name || !email || !password) return alert('All fields required');
    const code = generateCode();
    localStorage.setItem('ys_pending', JSON.stringify({name,email,password,code}));

    const templateParams = { user_name: name, code: code, user_email: email };
    try {
      await emailjs.send('service_dgi4qmd','template_tzznx69',templateParams,'fZ_0NZJ_EbvPkNe2S');
      alert('Verification code sent to email');
      navigate('/verify');
    } catch(err) {
      console.error(err);
      alert('Failed to send verification email');
    }
  };

  return (
    <div className='container'>
      <div className='card'>
        <h3>Create an account</h3>
        <input className='input' placeholder='Full name' value={name} onChange={e=>setName(e.target.value)} />
        <input className='input' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} />
        <input className='input' placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)} type='password' />
        <button className='button' onClick={handleSignup}>Send verification code</button>
        <p className='small' style={{marginTop:12}}>Already have an account? <a className='link' href='/login'>Login</a></p>
      </div>
    </div>
  );
}
