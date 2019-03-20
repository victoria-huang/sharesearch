import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import { ActionCableProvider } from 'react-actioncable-provider'
import { API_WS_ROOT } from './constants'

const store = createStore(rootReducer)

ReactDOM.render(
    <ActionCableProvider url={ API_WS_ROOT }>
        <Provider store={ store }>
            <App />
        </Provider>
    </ActionCableProvider>, 
    document.getElementById('root')
);


