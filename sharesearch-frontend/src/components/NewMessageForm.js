import React, { Component } from 'react'
import { API_ROOT, HEADERS } from '../constants'
import { connect } from 'react-redux'

class NewMessageForm extends Component {
    state = {
        content: '',
    }

    handleChange = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const body = {
            content: this.state.content,
            conversation_id: this.props.conversationId,
            sender_id: this.props.currentUser.id
        }

        fetch(`${API_ROOT}/messages`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify(body)
        })

        this.setState({ content: '' })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type='text'
                        value={ this.state.content }
                        onChange={ this.handleChange }
                    />
                    <input type='submit' value='Send Message' />
                </form>
          </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser
    }
}


export default connect(mapStateToProps)(NewMessageForm)