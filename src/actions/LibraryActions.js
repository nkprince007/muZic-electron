import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import electron from 'electron';

import store from '../store';

import keys from '../keys/keyfile';
import AppActions from './AppActions';
import app from '../lib/app';

const dialog = electron.remote.dialog;
const realpathAsync = Promise.promisify(fs.realpath);

const load = () => {
    // const querySort = {
    //     'loweredMetas.artist': 1,
    //     'year': 1,
    //     'loweredMetas.album': 1,
    //     'disk.no': 1,
    //     'track.no': 1
    // };
    //still needs implementation
};

const resetTracks = () => {
    store.dispatch({
        type: keys.REFRESH_LIBRARY,
        tracks: null
    });
};

const addFolders = () => {
    dialog.showOpenDialog({
        properties: ['openDirectory', 'multiSelections']
    }, folders => {
        if (folders !== undefined) {
            Promise.map(folders, folder => {
                return realpathAsync(folder);
            }).then(resolvedFolders => {
                store.dispatch({
                    type: keys.LIBRARY_ADD_FOLDERS,
                    folders: resolvedFolders
                });
            });
        }
    });
};

export default {
    load,
    addFolders
};
