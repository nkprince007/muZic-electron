import keys from '../keys/keyfile';
import store from '../store';

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
    store.dispatch({ e, type: keys.PLAYER_NEXT });
};

const previous = () => {
    store.dispatch({ type: keys.PLAYER_PREVIOUS });
};

// volume, shuffle, repeat, playbackRate,

export default {
    next,
    pause,
    play,
    playToggle,
    previous,
    stop
};
