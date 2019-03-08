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

        this.setState({
            ...DEFAULT_STATE
        })
    }

    render() {
        return(
            <>
            <h1>sharesearch</h1>
            <h3>login below:</h3>
            <form>

            </form>
            </>
        )
    }
}

export default Login