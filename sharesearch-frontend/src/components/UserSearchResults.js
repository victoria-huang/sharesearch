import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clearUserSearch } from '../actions'
import UserCard from './UserCard'
import v4 from 'uuid'

class UserSearchResults extends Component {
    componentWillUnmount() {
        this.props.clearUserSearch()
    }

    filterUsers = () => {
        return this.props.users.filter( u => {
            const nameMatch = (`${u.first_name} ${u.last_name}` === this.props.search)

            if (localStorage.getItem('token')) {
                return nameMatch && u.id !== this.props.currentUser.id
            }

            return nameMatch
        } )
    }

    renderUsers = () => this.filterUsers().map( u => <UserCard key={ v4() } { ...u } />)

    render() {
        return (
            <>
            { this.renderUsers() }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser,
        users: state.user.users,
        search: state.user.search
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearUserSearch: () => dispatch(clearUserSearch())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSearchResults)