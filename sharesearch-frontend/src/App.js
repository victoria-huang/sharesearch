import React, { Component } from 'react'
import './App.css'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Welcome from './components/Welcome'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile'
import ConversationList from './components/ConversationList'
import UserSearchResults from './components/UserSearchResults'
import withAuth from './hoc/withAuth';
import withAuthSuccess from './hoc/withAuthSuccess';

const ConversationListWithAuth = withAuth(ConversationList)
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
          <Route path='/search-users' render={ (props) => <UserSearchResults {...props} /> } />
          <Route path='/profile' render={ (props) => <ProfileWithAuth {...props} /> } />
          <Route path='/conversations' render={ (props) => <ConversationListWithAuth {...props} /> } />
        </Switch>
      </Router>
    );
  }
}

export default App;
