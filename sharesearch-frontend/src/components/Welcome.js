import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllUsers } from '../actions'
import UserSearch from './UserSearch'

class Welcome extends Component {
    componentDidMount() {
        fetch('http://localhost:3000/api/v1/users')
        .then(r => r.json())
        .then(users => this.props.getAllUsers(users))
    }

    render() {
        return (
            <>
            <h1>sharesearch</h1>
            <button onClick={ () => this.props.history.push('/login') }>login</button>
            <button onClick={ () => this.props.history.push('/signup') }>signup</button>
            <UserSearch />
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUsers: (users) => dispatch(getAllUsers(users))
    }
}

export default connect(null, mapDispatchToProps)(Welcome)