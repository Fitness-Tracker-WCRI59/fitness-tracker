import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const [isSuccess, setisSuccess] = useState(false)
  
  const loginSuccess = false;

  const handleLoginClick = () => {
    if (loginSuccess) {
      setisSuccess(!isSuccess)
      navigate('/main');
    }
  }

  const handleSignupClick = () => {
    navigate('/signup');
  }

  return  ( 
    <div>
  <div className = "login-container">
    <h1 className='login-text'>WEIGHT LOSS APP!!!!!</h1>
    <img className='login-pic' src="https://d26oc3sg82pgk3.cloudfront.net/files/media/edit/image/49067/large_thumb%402x.png"></img>
    <input className='input-fields' type="text" value={username} onChange = {(e) => setUsername(e.target.value)} placeholder='Username...'></input>
    <input className='input-fields' type="text" value={password} onChange = {(e) => setPassword(e.target.value)} placeholder='Password...'></input>
    <div className = "login-button-container">
      <button className = "login-buttons" id = "login-button" onClick={handleLoginClick}>Log In</button>
      <button className = "login-buttons" id = "signup-button" onClick={handleSignupClick}>Sign Up</button> 
    </div>
  </div>
  {!isSuccess && <p style={{color: 'red'}}>login credentials not found</p>}
  </div>
  )
}

export default Login;