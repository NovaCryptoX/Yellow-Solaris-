import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

export default function Dashboard(){
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [prices, setPrices] = useState({ BTC:56000, ETH:3400 });

  useEffect(()=>{
    const load = async () => {
      const sessionUser = JSON.parse(localStorage.getItem('ys_user') || 'null');
      if(!sessionUser){
        navigate('/login');
        return;
      }
      setUser(sessionUser);
      // fetch latest balance from Supabase
      const { data, error } = await supabase.from('users').select('*').eq('email', sessionUser.email).single();
      if(data){
        setBalance(parseFloat(data.balance) || 0);
        localStorage.setItem('ys_user', JSON.stringify(data));
      }
    };
    load();
  },[navigate]);

  useEffect(()=>{
    const id = setInterval(()=>{
      setPrices(prev=>({
        BTC: +(prev.BTC*(0.995 + Math.random()*0.01)).toFixed(2),
        ETH: +(prev.ETH*(0.995 + Math.random()*0.01)).toFixed(2)
      }));
    },4000);
    return ()=>clearInterval(id);
  },[]);

  const logout = async () => {
    localStorage.removeItem('ys_user');
    navigate('/login');
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='brand'><div className='logo'>YS</div><div><div className='h1'>Yellow Solaris</div><div className='small'>Training Simulator</div></div></div>
        <div>
          <button className='button' onClick={()=>navigate('/admin')}>Admin</button>
          <button className='button' style={{marginLeft:8}} onClick={logout}>Logout</button>
        </div>
      </div>

      <div className='card'>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <div className='small'>Total Balance</div>
            <div className='balance'>${balance.toFixed(2)}</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div className='small'>BTC</div>
            <div style={{fontWeight:700}}>${prices.BTC.toLocaleString()}</div>
            <div className='small' style={{marginTop:6}}>ETH - ${prices.ETH.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className='card'>
        <h3 className='small' style={{marginBottom:12}}>Portfolio</h3>
        <p className='small'>BTC - 0.1 ≈ ${(0.1*prices.BTC).toFixed(2)}</p>
        <p className='small'>ETH - 1.2 ≈ ${(1.2*prices.ETH).toFixed(2)}</p>
      </div>

      <div className='card'>
        <h3 className='small'>Recent Activity</h3>
        <ul className='small'>
          <li>Buy BTC 0.05 — ${(0.05*prices.BTC).toFixed(2)} — Completed</li>
          <li>Sell ETH 0.3 — ${(0.3*prices.ETH).toFixed(2)} — Completed</li>
        </ul>
      </div>

      <div className='footer'>Training demo — contact <a className='link' href='https://t.me/franciswagner_fx' target='_blank' rel='noreferrer'>Telegram</a></div>
    </div>
  );
}
