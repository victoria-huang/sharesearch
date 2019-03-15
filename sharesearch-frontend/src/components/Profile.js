import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCurrentUser, setConnections, acceptConnection, rejectConnection } from '../actions'
import NavBar from './NavBar'
import UserSearch from './UserSearch'
import v4 from 'uuid'

class Profile extends Component {

    componentDidMount() {
        fetch('http://localhost:3000/api/v1/profile', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(r => r.json())
        .then(user => {
            const connections = {
                allAcceptedConnections: user.all_accepted_connections,
                pendingConnections: user.pending_connections,
                pendingRequests: user.pending_requests
            }

            this.props.setCurrentUser(user)
            this.props.setConnections(connections)
        })
    }

    handleAccept = (connection) => {
        this.props.acceptConnection(connection)

        const body = {
            connector_id: connection.id,
            connected_id: this.props.currentUser.id
        }

        fetch('http://localhost:3000/api/v1/accept_connection', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(body)
        })
    }

    handleReject = (connection) => {
        this.props.rejectConnection(connection)

        const body = {
            connector_id: connection.id,
            connected_id: this.props.currentUser.id
        }

        fetch('http://localhost:3000/api/v1/reject_connection', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(body)
        })
    }

    renderGroups = () => {
        const username = this.props.currentUser.username
        return this.props.currentUser.groups.map( g => <li key={ v4() }>{ g.name === `${username}-solo` ? 'My Solo Group' : g.name }</li>)
    }

    renderConnections = () => this.props.acceptedConections.map( c => <li key={ v4() }>{ c.username }</li> )

    renderPendingConnections = () => this.props.pendingConnections.map( c => <li key={ v4() }>{ c.username }</li> )

    renderPendingRequests = () => this.props.pendingRequests.map( c => 
        <li key={ v4() }>
            { c.username }
            <button onClick={ () => this.handleAccept(c) }>Accept</button>
            <button onClick={ () => this.handleReject(c) }>Reject</button>
        </li> 
    )

    render() {
        return (
            <>
            <NavBar />
            { this.props.currentUser 
            ?
            <div>
                <h1>Hi { this.props.currentUser.first_name }</h1>
                <h3>My Groups</h3>
                    <ul>{ this.renderGroups() }</ul>

                <h3>My Connections</h3>
                    <ul>{ this.renderConnections() }</ul>

                <h3>Pending Connection Requests Awaiting Their Response</h3>
                    <ul>{ this.renderPendingConnections() }</ul>

                <h3>Pending Requests from Others Awaiting Your Response</h3>
                    <ul>{ this.renderPendingRequests() }</ul>
                
                <UserSearch />
            </div>
            :
            <div>Loading...</div>
            }
            </>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser,
        acceptedConections: state.connection.acceptedConnections,
        pendingConnections: state.connection.pendingConnections,
        pendingRequests: state.connection.pendingRequests
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentUser: (user) => dispatch(setCurrentUser(user)),
        setConnections: (connections) => dispatch(setConnections(connections)),
        acceptConnection: (connection) => dispatch(acceptConnection(connection)),
        rejectConnection: (connection) => dispatch(rejectConnection(connection))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)