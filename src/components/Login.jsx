import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const [isSuccess, setisSuccess] = useState(true)


  const handleLoginClick = async () => {
    // if (loginSuccess) {
    //   setisSuccess(!isSuccess)

    //   navigate('/main');
    // }
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
      })
      const data = await response.json();
      if (data.authenticated)
        navigate('/main');
    } catch (error) {
      console.log(error);
      setisSuccess(false);
    }
  }

  const handleSignupClick = () => {
    navigate('/signup');
  }

  return (
    <div>
      <div className="login-container">
        <h1 className='login-text'>WEIGHT LOSS APP!!!!!</h1>
        <img className='login-pic' src="https://d26oc3sg82pgk3.cloudfront.net/files/media/edit/image/49067/large_thumb%402x.png"></img>
        <input className='input-fields' type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username...' ></input>
        <input className='input-fields' type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password...' ></input>
        <div className="login-button-container">
          <button className="login-buttons" id="login-button" onClick={handleLoginClick}>Log In</button>
          <button className="login-buttons" id="signup-button" onClick={handleSignupClick}>Sign Up</button>
        </div>
      </div>
      {!isSuccess && <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'red' }}>Login credentials not found</p>}
    </div>
  )
}

export default Login;