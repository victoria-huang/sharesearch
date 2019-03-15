import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCurrentUser } from '../actions'
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
        .then(user => this.props.setCurrentUser(user))
    }

    renderGroups = () => {
        const username = this.props.currentUser.username
        return this.props.currentUser.groups.map( g => <li key={ v4() }>{ g.name === `${username}-solo` ? 'My Solo Group' : g.name }</li>)
    }

    renderConnections = (type) => {
        if (type === 'accepted') {
            return this.props.currentUser.accepted_connections.map( c => <li key={ v4() }>{ c.username }</li> )
        }

        return this.props.currentUser.pending_connections.map( c => <li key={ v4() }>{ c.username }</li> )
    }

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
                    <ul>{ this.renderConnections('accepted') }</ul>

                <h3>Pending Connections</h3>
                    <ul>{ this.renderConnections('pending') }</ul>
                
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
        currentUser: state.user.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentUser: (user) => dispatch(setCurrentUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)