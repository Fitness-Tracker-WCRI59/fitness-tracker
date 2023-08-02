import React from 'react';


const Pics = () => {



    return (
        <div id='pics'>
            <div className='pic'>
                <h2>BEFORE</h2>
                <img width={300} height={500} src='https://upload.wikimedia.org/wikipedia/en/c/c2/Peter_Griffin.png'/>
            </div>
            <div className='pic'>
                <h2>AFTER</h2>
                <img width={300} height={500} src='https://familyguyaddicts.files.wordpress.com/2015/02/handsome-peter.png'/>
            </div>
        </div>
        

    )
}


export default Pics;