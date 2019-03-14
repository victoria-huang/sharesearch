import React, { Component } from 'react' 
import { connect } from 'react-redux'
import { setUserSearch } from '../actions'
import { withRouter } from 'react-router-dom'

class UserSearch extends Component {
    state = {
        firstName: '',
        lastName: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const fullName = `${ this.state.firstName } ${ this.state.lastName }`

        this.props.setUserSearch(fullName)

        this.props.history.push({
            pathname: '/search-users',
            search: `?query=${fullName}`,
        })
    }

    render() {
        return (
            <>
            <h3>Search for connections</h3>
            <form onSubmit={ this.handleSubmit }>
                <input 
                    type='text' 
                    name='firstName'
                    value={ this.state.firstName } 
                    onChange={ this.handleChange }
                    placeholder='First Name'
                />
                <input 
                    type='text' 
                    name='lastName'
                    value={ this.state.lastName } 
                    onChange={ this.handleChange }
                    placeholder='Last Name'
                />
                <input type='submit' value='Search' />
            </form>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUserSearch: (search) => dispatch(setUserSearch(search))
    }
}

export default connect(null, mapDispatchToProps)(withRouter(UserSearch))
