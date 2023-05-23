import React from 'react'
import { auth, provider } from '../../firebase.js';
import { signInWithPopup } from 'firebase/auth';
import { AppContext } from '../../App';
import './Login.css'
import { Button } from '@mui/material';

function Login() {

  function signIn() {
    signInWithPopup(auth, provider)
    .catch(error => alert(error.message));
  }

  return (
    <div className='login'>
      <h2>Login page</h2>

      <div className='login__logo'>
        <img src='' alt='' />
      </div>

      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
}

export default Login