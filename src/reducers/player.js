import keys from '../keys/keyfile';

import Player from '../lib/player';

export default (state = {}, payload) => {
    switch (payload.type) {
        case (keys.PLAYER_TOGGLE): {
            if (Player.getAudio().paused && state.queue !== null) {
                Player.play();
                return {
                    ...state,
                    playerStatus: 'play'
                };
            }

            Player.pause();
            return {
                ...state,
                playerStatus: 'pause'
            };
        }

        case (keys.PLAYER_PLAY) : {
            if (state.queue !== null) {
                Player.play();
                return {
                    ...state,
                    playerStatus: 'play'
                };
            }

            return state;
        }

        case (keys.PLAYER_PAUSE): {
            Player.pause();
            const newState = {
                ...state,
                queue: [],
                queueCursor: null,
                playerStatus: 'stop'
            };

            newState.tracks = {
                library: {
                    all: null,
                    sub: null
                },
                playlist: {
                    all: null,
                    sub: null
                }
            };

            return newState;
        }

        default: {
            return state;
        }
    }
};
