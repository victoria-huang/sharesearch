import * as types from '../constants/ActionTypes'

export const setCurrentUser = (user) => {
    return {
        type: types.SET_CURRENT_USER,
        payload: user
    }
}

export const logout = () => {
    return {
        type: types.LOGOUT
    }
}