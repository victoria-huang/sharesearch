import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCurrentUser } from '../actions'
import NavBar from './NavBar'

class Profile extends Component {

    componentDidMount() {
        fetch('http://localhost:3000/api/v1/profile', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(r => r.json())
        .then(user => this.props.setCurrentUser(user))
    }

    render() {
        return (
            <>
            <NavBar />
            <div>Hi</div>
            </>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentUser: (user) => dispatch(setCurrentUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)