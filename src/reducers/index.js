import app from './app';
import library from './library';

const reducers = [
    app,
    library
];

export default (state, action) => {
    return reducers.reduce((currentState, reducer) => {
        return reducer(currentState, action);
    });
};

