import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [age, setAge] = useState(0);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [sex, setSex] = useState('');
  //this is the actual weight we need to change
  const [goal, setGoal] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  //condition for rending the textbox
  const [updateWeight, setUpdateWeight] = useState(false);
  //saves the value in the text box
  const [weightInput, setWeightInput] = useState('');
  const [calories, setCalories] = useState(0);
  const [days, setDays] = useState(0);
  const [activityLevel, setActivityLevel] = useState(0);
  const [calculate, setCalculate] = useState('');
  const [fieldsFilled, setFieldsFilled] = useState(false);
  const [displayCalculate, setDisplayCalculate] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
      fetch('/stats').then(response => response.json()).then(data => {
        console.log(data);
        setAge(data.age);
        setHeight(data.height);
        setWeight(data.weight);
        setSex(data.sex);
        setGoal(data.goal);
        setFirstName(data.firstName);
        setLastName(data.lastName);
      }).catch (error => {
        console.log(error);
      })
  }, []);



  const writeToDB = async () => {
    if (!Number(weightInput))
      return;
    setWeight(Number(weightInput));
    try {
      const response = await fetch('/stats', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ weight: Number(weightInput), goal: goal })
      })
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  const areFieldsFilled = () => {
    if (!calories || !days || !activityLevel) {
      setDisplayCalculate(false);

    }
    else {
      calculateCalories();
      setDisplayCalculate(true);

      setFieldsFilled(true);
    }
  }

  const calculateCalories = () => {
    console.log("calculating calories for : " + calories + " " + days + "days " + activityLevel + ' activityLevel');
    const metabolicRate = sex === 'male' ? 66.47 + (6.24 * Number(weight)) + (12.7 * Number(height)) - (6.755 * Number(age)) : 655.1 + (4.35 * Number(weight)) + (4.7 * Number(height)) - (4.7 * Number(age));

    const totalWeightLossCalories = (Number(weight) - Number(goal)) * 3500;
    const dailyWeightLossCalories = totalWeightLossCalories / Number(days);
    let activity = 0;

    switch (activityLevel) {
      case 1:
        activity = 1.2;
        break;
      case 2:
        activity = 1.375;
        break;
      case 3:
        activity = 1.55;
        break;
      case 4:
        activity = 1.725;
        break;
      case 5:
        activity = 1.9;
        break;
      default:
        activity = 1.4;
    }
    console.log(activity);
    let dailyBurnCalories = Math.floor(dailyWeightLossCalories + Number(calories) - metabolicRate * activity);
    if (dailyBurnCalories < 0) {
      dailyBurnCalories = 0;
    }
    setCalculate(dailyBurnCalories);
  }

  useEffect(() => {
    areFieldsFilled();
    setAnimate(true);
  }, [days, calories, activityLevel, weight, animate]);

  const toggleState = () => {
    if (updateWeight)
      writeToDB();
    setUpdateWeight(!updateWeight);
  }

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      toggleState();
    }
  }

  const getDate = () => {
    let today = new Date();
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let formattedDate = today.toLocaleDateString('en-US', options);
    return formattedDate;

  }
  return (
    <div>
      <div className='nav-bar'>
        <div className='nav-bar-component'>{getDate()}</div>
        <button className='nav-bar-component' id='update-weight-button' onClick={toggleState}>UPDATE WEIGHT</button>
        {updateWeight && <input id='weight-input' className='nav-bar-component' type="text" onKeyDown={handleEnterPress} onChange={(e) => { setWeightInput(Number(e.target.value)); setAnimate(false) }} placeholder='Current Weight... '></input>}
        <div className='nav-bar-component'>{`${firstName} ${lastName}`}</div>
      </div>
      <div className='main-container'>
        <div className='stats-outer-container'>
          <div className='stats-container'> Your current weight: <span style={{ fontWeight: 'bold' }}>{weight} lbs</span>
          </div>
          <div className='stats-container'> Your target weight: <span style={{ fontWeight: 'bold' }}>{goal} lbs</span>
          </div>
          <div className='stats-container'> How many <strong style={{ display: 'inline' }}>calories</strong> do you eat a day on average?
            <input className='stats-input' onChange={(e) => { setCalories(Number(e.target.value)); setAnimate(false) }}>
            </input>
          </div>
          <div className='stats-container'> In how many <strong>days</strong> do you want to achieve your goal?
            <input className='stats-input' onChange={(e) => { setDays(Number(e.target.value)); setAnimate(false) }}></input>
          </div>
          <div className='stats-container'> On a scale of <strong>1 - 5</strong> what is your activity level?
            <input className='stats-input' onChange={(e) => { setActivityLevel(Number(e.target.value)); setAnimate(false) }}></input>
          </div>
        </div>
        <div className='calc-container'>
          {fieldsFilled ? <div className='conditional-container'>
            <p>You need to burn</p>
            {<p id='number' className={animate ? 'tracking-in-expand' : ''}>{displayCalculate ? calculate : <br />}</p>}
            <p>calories per day to reach your target weight</p>
          </div> :
            <div>Please input your data!</div>}
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
