import keys from '../keys/keyfile';

export default (state = {}, payload) => {
    switch (payload) {

        case (keys.REFRESH_LIBRARY): {
            return {
                ...state,
                tracks: {
                    library: {
                        all: [...payload.tracks],
                        sub: [...payload.tracks],
                    },
                    playlist: {
                        all: [],
                        sub: []
                    }
                }
            };
        }
        
        case (keys.REFRESH_CONFIG): {
            return { ...state };
        }
        
        default: {
            return state;
        }
    }
};
