import app from './app';
import library from './library';

const reducers = [
    app,
    library
];

export default (state, action) => 
    reducers.reduce((currentState, reducer) => 
        reducer(currentState, action), state);

