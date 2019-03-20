import React from 'react'
import { ActionCable } from 'react-actioncable-provider'
import v4 from 'uuid'

const Cable = (props) => {
    return (
        <>
        { 
            props.conversations.map(c => 
                <ActionCable
                    key={ v4() }
                    channel={{ channel: 'MessageChannel', conversation_id: c.id }}
                    onReceived={ props.handleReceivedMessage }
                />
            )
        
        }
        </>
    )
}

export default Cable