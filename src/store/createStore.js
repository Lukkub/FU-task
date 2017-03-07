import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import reduxThunkMiddleware from 'redux-thunk'
import api from '../middleware/api';
import * as reducers from './reducers'

console.log("reducers", reducers);
export default function configureStore(initialState): Store {

  const middleware = [api, reduxThunkMiddleware];

  const store = createStore(
    combineReducers({ ...reducers.reducers }),
    initialState,
    applyMiddleware(...middleware)
  )

  return store
}
