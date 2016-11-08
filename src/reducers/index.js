import app from './app';
import library from './library';
import player from './player';

const reducers = [
    app,
    library,
    player
];

export default (state, action) =>
    reducers.reduce((currentState, reducer) =>
        reducer(currentState, action), state);
