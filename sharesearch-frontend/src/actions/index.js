import * as types from '../constants/ActionTypes'

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