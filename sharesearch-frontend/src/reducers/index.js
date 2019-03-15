import { combineReducers } from 'redux'
import user from './user'
import connection from './connection'

const rootReducer = combineReducers({
    user,
    connection
})

export default rootReducer