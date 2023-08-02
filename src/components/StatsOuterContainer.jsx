import React from 'react'

const StatsOuterContainer = ({setCalories, setAnimate, setDays, setActivityLevel, weight, goal}) => {
    return(
      <div className="stats-outer-container">
        <div className="stats-container">
          {' '}
          Your current weight:{' '}
          <span style={{fontWeight: 'bold'}}>{weight} lbs</span>
        </div>
        <div className="stats-container">
          {' '}
          Your target weight:{' '}
          <span style={{fontWeight: 'bold'}}>{goal} lbs</span>
        </div>
        <div className="stats-container">
          {' '}
          How many <strong style={{display: 'inline'}}>calories</strong> do you
          eat a day on average?
          <input
            className="stats-input"
            onChange={(e) => {
              setCalories(Number(e.target.value));
              setAnimate(false);
            }}></input>
        </div>
        <div className="stats-container">
          {' '}
          In how many <strong>days</strong> do you want to achieve your goal?
          <input
            className="stats-input"
            onChange={(e) => {
              setDays(Number(e.target.value));
              setAnimate(false);
            }}></input>
        </div>
        <div className="stats-container">
          {' '}
          On a scale of <strong>1 - 5</strong> what is your activity level?
          <input
            className="stats-input"
            onChange={(e) => {
              setActivityLevel(Number(e.target.value));
              setAnimate(false);
            }}></input>
        </div>
      </div>
    );
}


export default StatsOuterContainer
