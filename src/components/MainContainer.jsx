import React from 'react';
import CalcContainer from './CalcContainer.jsx';
import StatsOuterContainer from './StatsOuterContainer.jsx';




const MainContainer = ({ fieldsFilled,
    animate,
    displayCalculate,
    calculate,
    minutes, 
    setCalories, 
    setAnimate, 
    setDays, 
    setActivityLevel, 
    weight, 
    goal }) => {

    return (
        <>
            <StatsOuterContainer setCalories={setCalories} 
                setAnimate={setAnimate}
                setDays={setDays}
                setActivityLevel={setActivityLevel}
                weight={weight}
                goal={goal}
                />
            <CalcContainer fieldsFilled={fieldsFilled}
                animate={animate}
                displayCalculate={displayCalculate}
                calculate={calculate}
                minutes={minutes}
                />  
        </>
    )
}

export default MainContainer;