import app from '../lib/app';
import keys from '../keys/keyfile';
import utils from '../utilities/utils';

export default (state = {}, payload) => {
    switch (payload.type) {
        case (keys.LIBRARY_ADD_FOLDERS): {
            const folders = payload.folders;
            let musicFolders = app.config.get('musicFolders');

            if (folders !== undefined) {
                musicFolders = musicFolders.concat(folders);

                musicFolders = utils.removeUselessFolders(musicFolders);

                musicFolders.sort();

                app.config.set('musicFolders', musicFolders);
                app.config.saveSync();
            }

            return { ...state };
        }
        case (keys.LIBRARY_REMOVE_FOLDER): {
            if (!state.refreshingLibrary) {
                const musicFolders = app.config.get('musicFolders');

                musicFolders.splice(payload.index, 1);
                app.config.set('musicFolders', musicFolders);
                app.config.saveSync();

                return { ...state };
            }
            return state;
        }
        case (keys.LIBRARY_REFRESH_START): {
            return {
                ...state,
                refreshingLibrary: true
            };
        }
        case (keys.LIBRARY_REFRESH_END): {
            return {
                ...state,
                refreshingLibrary: false,
                refreshProgress: 0
            };
        }
        case (keys.LIBRARY_REFRESH_PROGRESS): {
            return {
                ...state,
                refreshProgress: payload.percentage
            };
        }
        default: {
            return state;
        }
    }
};
