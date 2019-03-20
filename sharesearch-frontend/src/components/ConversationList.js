import React, { Component } from 'react'
import { ActionCable } from 'react-actioncable-provider'
import { API_ROOT, HEADERS } from '../constants'
import v4 from 'uuid'
import Cable from './Cable'
import MessageList from './MessageList'
import NewConversationForm from './NewConversationForm'

class ConversationList extends Component {
    state = {
        conversations: [],
        activeConversationId: null
    }

    componentDidMount() {
        fetch(`${API_ROOT}/conversations`, {
            headers: HEADERS
        })
        .then(r => r.json())
        .then(conversations => this.setState({ conversations }))
    }

    handleClick = (id) => {
        this.setState({
            activeConversationId: id
        })
    }

    handleReceivedConversation = (response) => {
        const { conversation } = response

        this.setState({
            conversations: this.state.conversations.concat(conversation)
        })
    }

    handleReceivedMessage = (response) => {
        const { message } = response

        const conversations = [...this.state.conversations]

        const conversation = conversations.find(
          c => c.id === message.conversation.id
        )

        conversation.messages = [...conversation.messages, message]
            
        this.setState({ conversations })
    }
    
    findActiveConversation = () => this.state.conversations.find( c => c.id === this.state.activeConversationId)

    renderConversations = () => this.state.conversations.map(c =>
        <li key={ v4() } onClick={ () => this.handleClick(c.id) }>
            { c.room_name }
        </li>
    )

    render() {
        console.log(this.state)
        return (
            <div>
                <ActionCable 
                    channel={{ channel: 'ConversationChannel' }}
                    onReceived={ this.handleReceivedConversation }
                />

                <Cable 
                    conversations={ this.state.conversations }
                    handleReceivedMessage={ this.handleReceivedMessage }
                />

                <h3>Conversations</h3>
                <ul>
                    { this.renderConversations() }
                </ul>
                
                <NewConversationForm />

                { 
                    this.state.activeConversationId 
                    && 
                    <MessageList 
                        conversation={ this.findActiveConversation() }
                    />
                }

            </div>
        )
    }
}

export default ConversationList