import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Signup from './Signup';
import History from './History';


class App extends Component {

  render() {
    return (
      <Router>
        <Routes>
          <Route path ='/' element={<Login/>} />
          <Route path ='/signup' element={<Signup/>} />
          <Route path ='/main/*' element={<Dashboard/>} />
        </Routes>
      </Router>
    )
  }

}

export default App;

