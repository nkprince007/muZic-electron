import store from '../store';
import keys from '../keys/keyfile';

// import app from '../lib/app';
// import Player from '../lib/player.js';

const ipcRenderer = electron.ipcRenderer;

// Still need to work on errors and notifications

const playToggle = () => {
    store.dispatch({
        type: keys.PLAYER_TOGGLE
    });
};

const play = () => {
    store.dispatch({
        type: keys.PLAYER_PLAY
    });
};

const pause = () => {
    store.dispatch({
        type: keys.PLAYER_PAUSE
    });
};

const stop = () => {
    store.dispatch({
        type: keys.PLAYER_STOP
    });

    ipcRenderer.send('playerAction', 'stop');
};

const next = (e) => {
    store.dispatch({
        type: keys.PLAYER_NEXT,
        e
    });
};

const previous = () => {
    store.dispatch({
        type: keys.PLAYER_PREVIOUS
    });
};

// volume, shuffle, repeat, playbackRate,

export default {
    next,
    previous,
    play,
    pause,
    stop,
    playToggle
};
