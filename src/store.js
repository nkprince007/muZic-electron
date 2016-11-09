import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';

import reducer from './reducers/index';
import initialState from './reducers/initial-state';

const logger = createLogger();

const store = createStore(
    reducer,
    initialState,
    applyMiddleware(logger)
);

export default store;
