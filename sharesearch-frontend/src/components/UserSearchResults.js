import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clearUserSearch } from '../actions'
import UserCard from './UserCard'
import v4 from 'uuid'

class UserSearchResults extends Component {
    componentWillUnmount() {
        this.props.clearUserSearch()
    }

    filterUsers = () => this.props.users.filter( u => `${u.first_name} ${u.last_name}` === this.props.search )
    // also control so that you can't see yourself
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