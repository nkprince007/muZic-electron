export default {
    albums: { // Albums
        all: null, // All albums
        sub: null // Filtered albums (e.g. search)
    },
    cover: null,  // Current trackplaying cover
    notifications: [],    // The array of notifications
    oldQueue: null,  // Queue backup (in case of shuffle)

    playerStatus: 'stop', // Player status
    playlists: null,

    queue: [],    // Tracks to be played
    queueCursor: null,  // The cursor of the queue
    refreshProgress: 0,     // Progress of the refreshing library
    refreshingLibrary: false, // If the app is currently refreshing the tracks
    repeat: false, // the current repeat state (one, all, false)
    shuffle: false, // If shuffle mode is enabled

    tracks: {
        library: { // Tracks of the library view
            all: null, // All tracks
            sub: null  // Filtered tracks (e.g search)
        },
        playlist: {
            all: null,
            sub: null
        }
    },
    tracksCursor: 'library'  // 'library' or 'playlist'
};
