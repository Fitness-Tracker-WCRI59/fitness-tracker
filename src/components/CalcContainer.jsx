import React from 'react';


const CalcContainer = ({fieldsFilled,
    animate,
    displayCalculate,
    calculate,
    minutes}) => {

    return (
        <div className='calc-container'>
          {fieldsFilled ? <div className='conditional-container-1'>
            <div className='burn-box'>
              <p>You need to burn</p>
              {<p id='number' className={animate ? 'tracking-in-expand burn-calories' : ''} >{displayCalculate ? calculate : <br />}</p>}
              <p>calories per day to reach your target weight</p>
            </div>
            <div className='exercise-box'>
              <p>That's roughly {<p id='number' className={animate ? 'tracking-in-expand' : ''}>{displayCalculate ? minutes[0] : <br />}</p>} minutes of daily running</p>
              <p>{<p id='number' className={animate ? 'tracking-in-expand' : ''}>{displayCalculate ? minutes[1] : <br />}</p>} minutes of walking, or</p>
              <p>{<p id='number' className={animate ? 'tracking-in-expand' : ''}>{displayCalculate ? minutes[2] : <br />}</p>} minutes of bicycling!</p> </div>
          </div> :
            <div>Please input your data!</div>}
        </div>
    )
}

export default CalcContainer