import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import electron from 'electron';
import _ from 'lodash';
import globby from 'globby';

import store from '../store';
import utils from '../utilities/utils';

import keys from '../keys/keyfile';
import AppActions from './AppActions';
import app from '../lib/app';

const dialog = electron.remote.dialog;
const realpathAsync = Promise.promisify(fs.realpath);

const load = () => {
    const querySort = {
        title: 1,
        year: 1,
        'disk.no': 1,
        'track.no': 1
    };
    app.models.Song.find().sort(querySort).exec((err, songs) => {
        if (err) console.warn(err);
        else {
            store.dispatch({
                type: keys.REFRESH_LIBRARY,
                songs
            });
        }
    });
    refreshAlbums();
};

const addFolders = () => {
    dialog.showOpenDialog({
        properties: ['openDirectory', 'multiSelections']
    }, (folders) => {
        if (folders !== undefined) {
            Promise.map(folders, (folder) => realpathAsync(folder))
            .then((resolvedFolders) => {
                store.dispatch({
                    type: keys.LIBRARY_ADD_FOLDERS,
                    folders: resolvedFolders
                });
            }).then(() => refresh());
        }
    });
};

const removeFolder = (index) => {
    store.dispatch({
        type: keys.LIBRARY_REMOVE_FOLDER,
        index
    });
};

const refreshAlbums = () => {
    app.models.Song.find().exec((err, songs) => {
        if (err) console.warn(err);
        else {
            const albums = _.groupBy(songs, 'album');
            _.forIn(albums, (value, key) => {
                const album = {
                    title: key,
                    cover: _.union(value.map((song) => song.cover)),
                    artists: _.union(_.flatten(value.map((song) => song.albumartist))),
                    songs: value.map((song) => song.title),
                    songsSrc: value.map((song) => song.path)
                };
                console.info(album);
            });
        }
    });
};

const refresh = () => {
    store.dispatch({
        type: keys.LIBRARY_REFRESH_START
    });

    const folders = app.config.get('musicFolders');
    const fsConcurrency = 32;

    const getMetadataAsync = (track) => new Promise(
        (resolve) => utils.getMetadata(track, resolve)
    );

    app.models.Song.removeAsync({}, { multi: true }).then(() =>
        Promise.map(folders,
        (folder) => {
            const pattern = path.join(folder, '**/*.*');
            return globby(pattern, { nodir: true, follow: true });
        }))
        .then((filesArrays) => filesArrays
            .reduce((acc, array) => acc.concat(array), [])
            .filter((filePath) => app.supportedExtensions.includes(
                    path.extname(filePath).toLowerCase())
        ))
        .then((supportedFiles) => {
            let addedFiles = 0;
            const totalFiles = supportedFiles.length;
            return Promise.map(supportedFiles, (filePath) =>
            app.models.Song.findAsync({ path: filePath }).then((docs) => {
                if (docs.length === 0) {
                    return getMetadataAsync(filePath);
                }
                return docs[0];
            }).then((song) => app.models.Song.insert(song))
            .then(() => {
                const percent = parseInt((addedFiles * 100) / totalFiles, 10);
                console.info(percent);
                addedFiles++;
            }, { concurrent: fsConcurrency }))
            .then(() => {
                refreshAlbums();
                AppActions.library.load();
                store.dispatch({
                    type: keys.LIBRARY_REFRESH_END
                });
            }).catch((err) => console.warn(err));
        });
};

const fetchCover = (coverPath) => {
    utils.fetchCover(coverPath, (cover) => {
        store.dispatch({
            type: keys.LIBRARY_FETCHED_COVER,
            cover
        });
    });
};

const selectAndPlay = (trackId) => {
    store.dispatch({
        type: keys.SELECT_AND_PLAY,
        trackId
    });
};

export default {
    load,
    addFolders,
    removeFolder,
    refresh,
    fetchCover,
    selectAndPlay
};
