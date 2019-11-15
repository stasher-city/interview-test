import thunkMiddleware from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { reducers, defaultState } from './reducers'


const thunk = composeWithDevTools(applyMiddleware(thunkMiddleware))

export const initializeStore = (initialState = defaultState) => createStore(reducers, initialState, thunk)
