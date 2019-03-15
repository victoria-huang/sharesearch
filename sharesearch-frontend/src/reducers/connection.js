import { 
    SET_CONNECTIONS,
    REQUEST_CONNECTION,
    ACCEPT_CONNECTION,
    REJECT_CONNECTION
} from '../constants/ActionTypes'

const initialState = {
    acceptedConnections: [],
    pendingConnections: [],
    pendingRequests: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_CONNECTIONS:
            return {
                ...state,
                acceptedConnections: action.payload.allAcceptedConnections,
                pendingConnections: action.payload.pendingConnections,
                pendingRequests: action.payload.pendingRequests
            }
        case REQUEST_CONNECTION:
            return {
                ...state,
                pendingConnections: state.pendingConnections.concat(action.payload)
            }
        case ACCEPT_CONNECTION:
            return {
                ...state, 
                acceptedConnections: state.acceptedConnections.concat(action.payload),
                pendingRequests: state.pendingRequests.filter(c => c.id !== action.payload.id)
            }
        case REJECT_CONNECTION:
            return {
                ...state,
                pendingRequests: state.pendingRequests.filter(c => c.id !== action.payload.id)
            }
        default:
            return state
    }
}