import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

export default function Admin(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [auth,setAuth] = useState(false);
  const [users,setUsers] = useState([]);
  const [selectedEmail,setSelectedEmail] = useState('');
  const [amount,setAmount] = useState('');

  useEffect(()=>{
    // load single user if any
    const load = async () => {
      const { data, error } = await supabase.from('users').select('*').limit(1000);
      if(!error) setUsers(data || []);
    };
    load();
  },[]);

  const login = () => {
    if(email === 'frankmorrison000000001@gmail.com' && password === 'JOKER123'){
      setAuth(true);
    } else {
      alert('Invalid admin credentials');
    }
  };

  const applyChange = async () => {
    const val = parseFloat(amount);
    if(isNaN(val)) return alert('Enter a number');
    if(!selectedEmail) return alert('Select a user');
    // fetch current
    const { data } = await supabase.from('users').select('*').eq('email', selectedEmail).single();
    const newBal = parseFloat(data.balance || 0) + val;
    const { error } = await supabase.from('users').update({ balance: newBal }).eq('email', selectedEmail);
    if(error) return alert('Update failed: ' + error.message);
    alert('Balance updated to $' + newBal.toFixed(2));
    setAmount('');
    // refresh users list
    const { data: fresh } = await supabase.from('users').select('*').limit(1000);
    setUsers(fresh || []);
  };

  if(!auth) return (
    <div style={{padding:20}}>
      <h3>Admin Login</h3>
      <input className='input' placeholder='email' value={email} onChange={e=>setEmail(e.target.value)} />
      <input className='input' placeholder='password' value={password} onChange={e=>setPassword(e.target.value)} type='password' />
      <button className='button' onClick={login}>Login</button>
    </div>
  );

  return (
    <div className='container'>
      <div className='card'>
        <h3>Admin Console</h3>
        <div style={{marginBottom:12}}>
          <label className='small'>Select user</label>
          <select className='input' value={selectedEmail} onChange={e=>setSelectedEmail(e.target.value)}>
            <option value=''>-- pick user --</option>
            {users.map(u=> <option key={u.email} value={u.email}>{u.name} — {u.email}</option>)}
          </select>
        </div>

        <div>
          <input className='input' placeholder='Amount (e.g. 500 or -200)' value={amount} onChange={e=>setAmount(e.target.value)} />
          <button className='button' onClick={applyChange}>Apply</button>
        </div>

        <div style={{marginTop:18}}>
          <h4 className='small'>Users ({users.length})</h4>
          <div style={{maxHeight:240, overflow:'auto'}}>
            {users.map(u=>(
              <div key={u.email} style={{padding:8,borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                <strong>{u.name}</strong> — {u.email} — ${parseFloat(u.balance || 0).toFixed(2)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
