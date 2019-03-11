import React, { Component } from 'react'

const withAuthSuccess = (ComponentToWrap) => {
    return class extends Component {
        componentDidMount() {
            if (localStorage.getItem('token')) {
                this.props.history.push('/profile')
            }
        }

        render() {
            return (
                <>
                <ComponentToWrap { ...this.props } />
                </>
            )
        }
    }
}

export default withAuthSuccess