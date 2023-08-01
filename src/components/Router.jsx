import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import App from './App';

const Router = () => {
    return (
        <div>
            <Routes>
                <Route exact path='/' element={<App />} />
{/* path='/login' */}
            </ Routes>
        </div>
    )
}

export default Router;

// useNavigate();

