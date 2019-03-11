import React, { Component } from 'react'

const DEFAULT_STATE = {
    username: '',
    password: ''
}

class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const body = {
            user: {
                username: this.state.username,
                password: this.state.password
            }
        }

        fetch('http://localhost:3000/api/v1/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(r => r.json())
        .then(data => {
            localStorage.setItem('token', data.jwt)
            this.props.history.push('/profile')
        })


        this.setState({
            ...DEFAULT_STATE
        })
    }

    render() {
        return(
            <>
            <h1>sharesearch</h1>
            <h3>login below:</h3>
            <form onSubmit={ this.handleSubmit }>
                username: 
                <input 
                    type='text' 
                    name='username' 
                    value={ this.state.username } 
                    onChange={ this.handleChange }
                />
                <br />
                password:
                <input 
                    type='password' 
                    name='password' 
                    value={  this.state.password } 
                    onChange={ this.handleChange }
                /> 
                <br />
                <input type='submit' value='login' />
            </form>
            </>
        )
    }
}

export default Login