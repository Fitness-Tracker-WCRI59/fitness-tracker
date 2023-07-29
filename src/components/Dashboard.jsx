import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [username, setUsername] = useState("bross123");
  const [password, setPassword] = useState("BobRoss123");
  const navigate = useNavigate();
  const [age, setAge] = useState(99);
  const [height, setHeight] = useState(72);
  const [weight, setWeight] = useState(200);
  const [sex, setSex] = useState('male');
  //this is the actual weight we need to change
  const [goal, setGoal] = useState(180);
  const [firstName, setFirstName] = useState('Bob');
  const [lastName, setLastName] = useState('Ross');
  //condition for rending the textbox
  const [updateWeight, setUpdateWeight] = useState(false);
  //saves the value in the text box
  const [weightInput, setWeightInput] = useState('');
  const [calories, setCalories] = useState(2000);
  const [days, setDays] = useState(30);

  const writeToDB = () => {
      setWeight(weightInput);
    //add submit logic in here once server is setup

  }

  const calculateCalories = () => {

    const metabolicRate = sex === 'male' ? (66.47 * Number(weight)) + (12.7* Number(height)) - (6.755 * Number(age)) : 655.1 +(4.35* Number(weight)) + (4.7* Number(height)) - (4.7 * Number(age));

    const res = ((Number(weight) - Number(goal)) * 3500 )/( Number(days) + Number(calories) - metabolicRate);
    return res;
  }

  useEffect(() => {
    calculateCalories();
  }, [days, calories]);

  const toggleState = () => {
    if(updateWeight)
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
    <button className='nav-bar-component' id='update-weight-button' onClick= {toggleState}>UPDATE WEIGHT</button>
  {updateWeight && <input className='nav-bar-component' type="text" onKeyDown={handleEnterPress} onChange = {(e) => setWeightInput(e.target.value)} placeholder='New Weight Goal... '></input>}
    
    
    
    
    
    
    
    
    <div className='nav-bar-component'>{`${firstName} ${lastName}`}</div>

    </div>

    <div className='main-container'> 

      <div className='stats-outer-container'> 

        <div className='stats-container'> Your current weight: {weight}

        </div>
        <div className='stats-container'> Your desired weight: {goal}

        </div>
        <div className='stats-container'> How many calories do you eat a day on average?
        <input className='stats-input' onChange = {(e) => setCalories(e.target.value)}> 

        </input>

        </div>
        <div className='stats-container'> In how many days do you want to achieve your goal?
        <input className='stats-input' onChange = {(e) => setDays(e.target.value)}></input>
        </div>

      </div>

      <div className='calc-container'> calc container



      </div>


    </div>

    </div>
  )
}

export default Dashboard;
