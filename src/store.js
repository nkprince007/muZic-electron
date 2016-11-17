import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';

import reducer from './reducers/index';
import initialState from './reducers/initial-state';
import keys from './keys/keyfile';

const logger = createLogger({
    collapsed: (getState, action) => action.type === keys.LIBRARY_REFRESH_PROGRESS
});

const store = createStore(
    reducer,
    initialState,
    applyMiddleware(logger)
);

export default store;
