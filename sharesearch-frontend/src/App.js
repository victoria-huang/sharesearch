import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ActionCable from 'actioncable'

class App extends Component {
  state = {
    bio: ''
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/profile', {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozfQ.m12gtrXTQ4P_jqoqM0tfx0lQes8daPfL9TC19vnAk7o'
      }
    })
    .then(r => r.json())
    .then(user => user.bio ? this.setState({ bio: user.bio }) : null )

    const cable = ActionCable.createConsumer('ws://localhost:3000/cable')

    this.sub = cable.subscriptions.create('BiosChannel', {
      received: this.handleReceiveNewBio
    })
  }

  handleReceiveNewBio = ({ bio }) => {
    if (bio !== this.state.bio) {
      this.setState({ bio })
    }
  }

  handleChange = (e) => {
    this.setState({
      bio: e.target.value
    })

    this.sub.send({ 
      bio: e.target.value, 
      id: 3 
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          
          <textarea onChange={ this.handleChange } value={ this.state.bio } />
        </header>
      </div>
    );
  }
}

export default App;
