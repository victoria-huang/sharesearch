import * as types from '../constants/ActionTypes'

/**** user ****/

export const getAllUsers = (users) => {
    return {
        type: types.GET_ALL_USERS,
        payload: users
    }
}

export const setUserSearch = (search) => {
    return {
        type: types.SET_USER_SEARCH,
        payload: search
    }
}

export const clearUserSearch = () => {
    return {
        type: types.CLEAR_USER_SEARCH
    }
}

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

/**** connection ****/

export const setConnections = (connections) => {
    return {
        type: types.SET_CONNECTIONS,
        payload: connections
    }
}

export const requestConnection = (connection) => {
    return {
        type: types.REQUEST_CONNECTION,
        payload: connection
    }
}

export const acceptConnection = (connection) => {
    return {
        type: types.ACCEPT_CONNECTION,
        payload: connection
    }
}

export const rejectConnection = (connection) => {
    return {
        type: types.REJECT_CONNECTION,
        payload: connection
    }
}

