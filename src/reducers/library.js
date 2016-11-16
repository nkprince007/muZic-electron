import app from '../lib/app';
import keys from '../keys/keyfile';
import utils from '../utilities/utils';
import Player from '../lib/player';

export default (state = {}, payload) => {
    switch (payload.type) {
        case (keys.SELECT_AND_PLAY): {
            const queue = [...state.tracks[state.tracksCursor].sub];
            const id = payload.trackId;

            let queueCursor = null;
            let queuePosition = null;

            for (let i = 0; i < queue.length; i++) {
                if (queue[i]._id === id) {
                    queuePosition = i;
                    queueCursor = i;
                    break;
                }
            }
            // needs fixing here for album songs playback and sync
            // console.log(`queuePosition: ${queuePosition}, queueCursor: ${queueCursor}, queue: ${queue}`);

            if (queuePosition !== null) {
                const uri = utils.parseUri(queue[queuePosition].path);

                Player.setAudioSrc(uri);
                Player.play();

                if (state.shuffle) {
                    let index = 0;

                    for (let i = 0; i < queue.length; i++) {
                        if (queue[i]._id === id) {
                            index = i;
                            break;
                        }
                    }

                    const firstTrack = queue[index];
                    queue.splice(id, 1);

                    let m = queue.length;
                    let t;
                    let i;
                    while (m) {
                        i = Math.floor(Math.random() * m--);

                        t = queue[m];
                        queue[m] = queue[i];
                        queue[i] = t;
                    }

                    queue.unshift(firstTrack);
                    queueCursor = 0;
                }

                return {
                    ...state,
                    queue,
                    queueCursor,
                    oldQueue: queue,
                    oldQueueCursor: queueCursor,
                    playerStatus: 'play'
                };
            }
            return state;
        }
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
        case (keys.LIBRARY_FETCHED_COVER): {
            return {
                ...state,
                cover: payload.cover
            };
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
        case (keys.FILTER_SEARCH_SONGS): {
            if(!payload.searchTerm) {
                const newState = { ...state };
                newState.tracks[state.tracksCursor].sub = [...state.tracks[state.tracksCursor].all];
                return newState;
            }

            const search = utils.stripChars(payload.searchTerm.toLowerCase());

            const allCurrentTracks = state.tracks[state.tracksCursor].all;
            const tracks = [].concat(allCurrentTracks).filter((track) => {
                return track.loweredMetas.artist.join(', ').includes(search)
                    || track.loweredMetas.album.includes(search)
                    || track.loweredMetas.genre.join(', ').includes(search)
                    || track.loweredMetas.title.includes(search);
            });

            const newState = { ...state };
            newState.tracks[state.tracksCursor].sub = tracks;
            return newState;
        }
        case (keys.FILTER_SEARCH_ALBUMS): {
            const newState = { ...state };

            if(!payload.searchTerm) {
                newState.albums.sub = [...state.albums.all];
                return newState;
            }

            const search = utils.stripChars(payload.searchTerm.toLowerCase());

            const allAlbums = state.albums.all;
            const albums = [].concat(allAlbums).filter((album) => {
                return album.loweredMetas.title.includes(search);
            });

            newState.albums.sub = albums;
            return newState;
        }
        default: {
            return state;
        }
    }
};
