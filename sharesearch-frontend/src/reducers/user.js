import { SET_CURRENT_USER } from '../constants/ActionTypes'

const initialState = {
    currentUser: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state
    }
}