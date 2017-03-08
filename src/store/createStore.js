import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxThunkMiddleware from 'redux-thunk';
import api from '../middleware/api';
import { reducers } from './reducers';

export default function configureStore (initialState) {
    const middleware = [api, reduxThunkMiddleware];

    const store = createStore(
    combineReducers({ ...reducers }),
    initialState,
    applyMiddleware(...middleware)
  );

    return store;
}
