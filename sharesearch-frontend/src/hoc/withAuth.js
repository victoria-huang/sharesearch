import React, { Component } from 'react'

const withAuth = (ComponentToWrap) => {
    return class extends Component {
        componentDidMount() {
            if (!localStorage.getItem('token')) {
                this.props.history.push('/')
            }
        }

        render() {
            console.log(this.props)
            return (
                <>
                { localStorage.getItem('token') && <ComponentToWrap { ...this.props } /> }
                </>
            )
        }
    }
}

export default withAuth