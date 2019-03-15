import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { requestConnection } from '../actions'

const UserCard = (props) => {
    const handleAddConnection = (connection) => {
        props.requestConnection(connection)

        const body = {
            connector_id: props.currentUser.id,
            connected_id: connection.id
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

    const renderRequestText = () => {
        if ( props.acceptedConnections.find( c => c.id === props.id) ) {
            return <strong>Connected</strong>
        } else if ( props.pendingConnections.find( c => c.id === props.id) ) {
            return <strong>Request Sent</strong>
        } else if ( props.pendingRequests.find( c => c.id === props.id) ) {
            return <strong>Awaiting your response</strong>
        }

        return <button onClick={ () => handleAddConnection(props) }>Request Connection</button>
    }

    return (
        <>
        { props.first_name } { props.last_name }
        { 
            localStorage.getItem('token') ? 
            <>
            <button>
                View Profile
            </button>
            { renderRequestText() }
            </>
            :
            <button onClick={ () => props.history.push('/login') }>Login to view full profile!</button>
        }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser,
        acceptedConnections: state.connection.acceptedConnections,
        pendingConnections: state.connection.pendingConnections,
        pendingRequests: state.connection.pendingRequests
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestConnection: (connection) => dispatch(requestConnection(connection))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserCard))