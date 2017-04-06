import AppActions from './AppActions';
import Promise from 'bluebird';

import _ from 'lodash';
import app from '../lib/app';
import fs from 'fs';
import globby from 'globby';
import keys from '../keys/keyfile';
import path from 'path';

import store from '../store';
import utils from '../utilities/utils';

const dialog = electron.remote.dialog;
const realpathAsync = Promise.promisify(fs.realpath);

const load = () => {
    const querySort = {
        'disk.no': 1,
        title: 1,
        'track.no': 1,
        year: 1
    };
    app.models.Song.find().sort(querySort).exec((err, songs) => {
        if (err) console.warn(err);
        else {
            store.dispatch({
                songs,
                type: keys.REFRESH_LIBRARY
            });
        }
    });
    loadAlbums();
};

const loadAlbums = () => {
    const querySort = {
        title: 1
    };
    app.models.Album.find().sort(querySort).exec((err, albums) => {
        if (err) console.warn(err);
        else {
            store.dispatch({
                albums,
                type: keys.LIBRARY_REFRESH_ALBUMS
            });
        }
    });
};

const addFolders = () => {
    dialog.showOpenDialog({
        properties: ['openDirectory', 'multiSelections']
    }, (folders) => {
        if (folders !== undefined) {
            Promise.map(folders, (folder) => realpathAsync(folder))
                .then((resolvedFolders) => {
                    store.dispatch({
                        folders: resolvedFolders,
                        type: keys.LIBRARY_ADD_FOLDERS
                    });
                }).then(() => refresh());
        }
    });
};

const removeFolder = (index) => {
    store.dispatch({
        index,
        type: keys.LIBRARY_REMOVE_FOLDER
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

    app.models.Song.removeAsync({}, {
        multi: true
    }).then(() =>
            Promise.map(folders,
                (folder) => {
                    const pattern = path.join(folder, '**/*.*');
                    return globby(pattern, {
                        follow: true,
                        nodir: true
                    });
                }))
        .then((filesArrays) => filesArrays
            .reduce((acc, array) => acc.concat(array), [])
            .filter((filePath) => app.supportedExtensions.includes(
                path.extname(filePath).toLowerCase())))
        .then((supportedFiles) => {
            if (supportedFiles.length === 0) {
                store.dispatch({
                    type: keys.LIBRARY_REFRESH_END
                });
                return;
            }

            let addedFiles = 0;
            const totalFiles = supportedFiles.length;
            return Promise.map(supportedFiles, (filePath) =>
                    app.models.Song.findAsync({
                        path: filePath
                    }).then((docs) => {
                        if (docs.length === 0) {
                            return getMetadataAsync(filePath);
                        }
                        return docs[0];
                    }).then((song) => app.models.Song.insertAsync(song))
                    .then(() => {
                        const percent = parseInt((addedFiles * 100) / totalFiles, 10);
                        store.dispatch({
                            percent,
                            type: keys.LIBRARY_REFRESH_PROGRESS
                        });
                        addedFiles++;
                    }, {
                        concurrent: fsConcurrency
                    }))
                .then(() => {
                    return app.models.Album.removeAsync({}, {
                        multi: true
                    }).then(() => {
                        return app.models.Song.findAsync({});
                    }).then((songs) => {
                        const albums = _.groupBy(songs, 'album');
                        _.forIn(albums, (songsList, key) => {
                            const album = {
                                artists: _.union(_.flatten(songsList.map((song) => song.albumartist))),
                                cover: _.union(songsList.map((song) => song.cover)),
                                duration: _.sum(songsList.map((song) => song.duration)),
                                loweredMetas: {
                                    title: songsList[0].loweredMetas.album
                                },
                                songsList: songsList.map((song) => song.path),
                                title: key,
                                tracks: songsList.length,
                                year: _.last(_.union(songsList.map((song) => song.year)))
                            };
                            app.models.Album.insertAsync(album);
                        });
                    }).then(() => {
                        loadAlbums();
                    });
                })
                .then(() => {
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
            cover,
            type: keys.LIBRARY_FETCHED_COVER
        });
    });
};

const selectAndPlay = (trackId) => {
    store.dispatch({
        trackId,
        type: keys.SELECT_AND_PLAY
    });
};

const search = (searchTerm) => {
    store.dispatch({
        searchTerm,
        type: keys.FILTER_SEARCH_SONGS
    });
};

const searchAlbums = (searchTerm) => {
    store.dispatch({
        searchTerm,
        type: keys.FILTER_SEARCH_ALBUMS
    });
};

const reset = () => {
    store.dispatch({
        type: keys.LIBRARY_REFRESH_START
    });
    app.models.Song.remove({}, {
        multi: true
    }, (err) => {
        if (err) console.warn(err);
        app.models.Album.remove({}, {
            multi: true
        }, (err) => {
            if (err) console.warn(err);
            AppActions.library.load();
            store.dispatch({
                type: keys.LIBRARY_REFRESH_END
            });
        });
    });
};

export default {
    addFolders,
    fetchCover,
    load,
    refresh,
    removeFolder,
    reset,
    search,
    searchAlbums,
    selectAndPlay
};
