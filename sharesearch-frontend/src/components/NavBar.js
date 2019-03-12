import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions'
import { withRouter } from 'react-router-dom'

const NavBar = (props) => {
    const handleClick = () => {
        localStorage.clear()
        props.logout()
        props.history.push('/')
    }
 
    return (
        <>
        <button onClick={ handleClick }>Logout</button>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(withRouter(NavBar))