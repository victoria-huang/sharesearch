import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Welcome from './components/Welcome'
import Login from './components/Login'
import Signup from './components/Signup'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' render={ (props) => <Welcome { ...props } /> } />
          <Route path='/login' render={ (props) => <Login {...props} /> } />
          <Route path='/signup' render={ (props) => <Signup {...props} /> } />
        </Switch>
      </Router>
    );
  }
}

export default App;
