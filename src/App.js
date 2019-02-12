import React, { Component } from 'react';
import { Route } from 'react-router'
import {BrowserRouter} from 'react-router-dom'

import Login from './components/Login'
import SignUp from './components/SignUp'
import Account from './components/Account'
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <div>
          <Route exact path='/' component={Login} />
          <Route path='/signup' component={SignUp} />
          <Route path='/account' component={Account} />
        </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
