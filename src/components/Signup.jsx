import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isSuccess, setisSuccess] = useState(true);
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [sex, setSex] = useState('');
  const [goal, setGoal] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSignup = async () => {
    console.log(sex);
    if ((sex !== 'male' && sex !== 'female') || (isNaN(Number(age)) && isNaN(Number(height)) && isNaN(Number(weight)) && isNaN(Number(goal)))) {
      setisSuccess(false);
      return;
    }

    const obj = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      age: Number(age),
      sex: sex,
      height: Number(height),
      weight: Number(weight),
      goal: Number(goal)
    }
    console.log(obj);
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      const data = await response.json();
      if (response.ok)
        navigate('/main');
      
    } catch (error) {
      console.log(error);

    }
    navigate('/main')
    return obj;

  }

  return (
    <div>
      <div className="login-container">
        <h1 className='login-text'>Please Fill In Your Info!!!!!</h1>
        <img className='login-pic' src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://fitnessfor10.com/wp-content/uploads/2019/05/Fitness-for-10-Home-Licensing-Information.jpg"></img>
        <input className='input-fields' type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username...' required></input>
        <input className='input-fields' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password...' required></input>
        <input className='input-fields' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name...' required></input>
        <input className='input-fields' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name...' required></input>
        <input className='input-fields' type="text" value={age} onChange={(e) => setAge(e.target.value)} placeholder='Age...' required></input>
        <div className='input-fields' id='sex'>
          <label htmlFor='male'>Male</label>
          <input className='input-radio' id='male' type='radio' value='male' name='sex' onChange={(e) => setSex(e.target.value)}></input>
          <label htmlFor='male'>Female</label>
          <input className='input-radio' id='female' type='radio' value='female' name='sex' onChange={(e) => setSex(e.target.value)}></input>
        </div>
        <input className='input-fields' type="text" value={height} onChange={(e) => setHeight(e.target.value)} placeholder='Height in inches...' required></input>
        <input className='input-fields' type="text" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder='Weight in lbs...' required></input>
        <input className='input-fields' type="text" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder='Goal Weight in lbs...' required></input>
        <div className="login-button-container">
          <button className="login-buttons" id="signup-button" onClick={handleSignup}>Sign Up</button>
        </div>
        {!isSuccess && <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'red' }}>Please fill out all fields with correct values</p>}
      </div>
    </div>
  )
}

export default Signup;
