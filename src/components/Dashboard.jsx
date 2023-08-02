import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import MainContainer from './MainContainer.jsx';
import History from './History.jsx';
import Pics from './Pics.jsx';
import GamePlan from './GamePlan.jsx';

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
  const [goalInput, setGoalInput] = useState('');
  const [calories, setCalories] = useState(0);
  const [days, setDays] = useState(0);
  const [activityLevel, setActivityLevel] = useState(0);
  const [calculate, setCalculate] = useState('');
  const [fieldsFilled, setFieldsFilled] = useState(false);
  const [displayCalculate, setDisplayCalculate] = useState(false);
  const [updateWeightGoal, setUpdateWeightGoal] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const navigate = useNavigate();

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
    }).catch(error => {
      console.log(error);
    })
  }, []);

  const logout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'DELETE',

      })
      if (response.ok)
        navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  const writeToDB = async () => {
    if (isNaN(Number(weightInput)))
      return;
    setWeight(Number(weightInput));
    try {
      const response = await fetch('/stats', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ weight: Number(weightInput) })
      })
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  const writeToDB2 = async () => {
    if (isNaN(Number(goalInput)))
      return;
    setGoal(Number(goalInput));
    try {
      const response = await fetch('/stats', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ goal: Number(goalInput) })
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


    const minutes = dailyBurnCalories / (3.5 * weight * 0.45 / 200);
    setMinutes([Math.floor(minutes / 11.5).toLocaleString("en-US"), Math.floor(minutes / 2).toLocaleString("en-US"), Math.floor(minutes / 8).toLocaleString("en-US")]);
    dailyBurnCalories = dailyBurnCalories.toLocaleString("en-US");
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

  const toggleStateGoal = () => {
    if (updateWeightGoal)
      writeToDB2();
    setUpdateWeightGoal(!updateWeightGoal);
  }

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      setAnimate(false)
      toggleState();
    }
  }

  const handleEnterPressGoal = (e) => {
    if (e.key === 'Enter') {
      setAnimate(false)
      toggleStateGoal();

    }
  }

  return (
    <div>
      <Navbar setUpdateWeight={setUpdateWeight} 
      updateWeight={updateWeight} 
      handleEnterPress={handleEnterPress} 
      setWeightInput={setWeightInput} 
      setUpdateWeightGoal={setUpdateWeightGoal} 
      updateWeightGoal={updateWeightGoal} 
      handleEnterPressGoal={handleEnterPressGoal}
      setGoalInput={setGoalInput}
      firstName={firstName}
      lastName={lastName}
      logout={logout}
    />
      <div className='main-container'>
        <Routes>
          <Route path='/' element={
            <MainContainer
              setCalories={setCalories} 
              setAnimate={setAnimate}
              setDays={setDays}
              setActivityLevel={setActivityLevel}
              weight={weight}
              goal={goal}
              fieldsFilled={fieldsFilled}
              animate={animate}
              displayCalculate={displayCalculate}
              calculate={calculate}
              minutes={minutes}
            />} />
          <Route path='/history' element={
            <History 
          />} />
          <Route path='/pics' element={
            <Pics
          />} />
          <Route path='/gameplan' element={
            <GamePlan
          />} />
        </Routes>
      </div>
    </div>
  )
}

export default Dashboard;
