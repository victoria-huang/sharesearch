import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
//NOTE: need to add action to request connection

const handleAddConnection = (userId, connectionId) => {
    const body = {
        c1: {
            connector_id: userId,
            connected_id: connectionId
        },
        c2: {
            connected_id: userId,
            connector_id: connectionId
        }
    }

    fetch('http://localhost:3000/api/v1/connections', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    })
}

const UserCard = (props) => {
    console.log(props)
    return (
        <>
        { props.first_name } { props.last_name }
        { localStorage.getItem('token') ? 
            <>
            <button>View Profile</button>
            <button onClick={ () => handleAddConnection(props.currentUser.id, props.id ) }>Request Connection</button>
            </>
            :
            <button onClick={ () => props.history.push('/login') }>Login to view full profile!</button>
        }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser
    }
}

export default connect(mapStateToProps)(withRouter(UserCard))