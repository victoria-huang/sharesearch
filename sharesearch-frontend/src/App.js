import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Welcome from './components/Welcome'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile'
import withAuth from './hoc/withAuth';

const ProfileWithAuth = withAuth(Profile)

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' render={ (props) => <Welcome { ...props } /> } />
          <Route path='/login' render={ (props) => <Login {...props} /> } />
          <Route path='/signup' render={ (props) => <Signup {...props} /> } />
          <Route path='/profile' render={ (props) => <ProfileWithAuth {...props} /> } />
        </Switch>
      </Router>
    );
  }
}

export default App;
