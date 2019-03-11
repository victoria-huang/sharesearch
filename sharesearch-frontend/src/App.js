import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Welcome from './components/Welcome'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile'
import withAuth from './hoc/withAuth';
import withAuthSuccess from './hoc/withAuthSuccess';

const ProfileWithAuth = withAuth(Profile)
const WelcomeWithAuthSuccess = withAuthSuccess(Welcome)
const LoginWithAuthSuccess = withAuthSuccess(Login)
const SignupWithAuthSuccess = withAuthSuccess(Signup)

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' render={ (props) => <WelcomeWithAuthSuccess { ...props } /> } />
          <Route path='/login' render={ (props) => <LoginWithAuthSuccess {...props} /> } />
          <Route path='/signup' render={ (props) => <SignupWithAuthSuccess {...props} /> } />
          <Route path='/profile' render={ (props) => <ProfileWithAuth {...props} /> } />
        </Switch>
      </Router>
    );
  }
}

export default App;
