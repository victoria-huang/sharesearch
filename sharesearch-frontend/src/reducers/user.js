import { 
    GET_ALL_USERS, 
    SET_USER_SEARCH,
    CLEAR_USER_SEARCH,
    SET_CURRENT_USER, 
    LOGOUT 
} from '../constants/ActionTypes'

const initialState = {
    users: [],
    search: '',
    currentUser: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_USERS:
            return {
                ...state,
                users: action.payload
            }
        case SET_USER_SEARCH:
            return {
                ...state,
                search: action.payload
            }
        case CLEAR_USER_SEARCH:
            return {
                ...state,
                search: ''
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case LOGOUT:
            return initialState
        default:
            return state
    }
}