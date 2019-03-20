import React from 'react'
import NewMessageForm from './NewMessageForm'
import v4 from 'uuid'

const renderOrderedMessages = (messages) => {
    const ordered = messages.sort( (a, b) => new Date(a.created_at) - new Date(b.created_at) )
    
    return ordered.map( message => 
        <li key={ v4() }>
            <strong>{ `${message.sender.first_name} ${message.sender.last_name}` }</strong>
            <br />
            { message.content }
        </li>
    )
}

const MessageList = ({ conversation: { id, room_name, messages } }) => {
    return (
        <div>
            <h3>{ room_name }</h3>

            <ul>
                { renderOrderedMessages(messages) }
            </ul>

            <NewMessageForm conversationId={ id } />
        </div>
    )
}

export default MessageList