import Promise from 'bluebird';
import leveljs from 'level-js';
import linvodb from 'linvodb3';
import path from 'path';
import teeny from 'teeny-conf';

const remote = electron.remote;
const app = remote.app;

/*
|----------------------------------------------------------------------
| Common Variables
|----------------------------------------------------------------------
*/

const browserWindows = {};
browserWindows.main = remote.getCurrentWindow();

const pathUserData = app.getPath('userData');
const pathSrc = __dirname;

/*
|----------------------------------------------------------------------
| Config
|----------------------------------------------------------------------
*/

const conf = new teeny(path.join(pathUserData, 'config.json'));
conf.loadOrCreateSync();

/*
|----------------------------------------------------------------------
| Supported Music Formats
|----------------------------------------------------------------------
*/

const supportedExtensions = [
    '.mp3',
    '.mp4',
    '.aac',
    '.m4a',
    '.3gp',
    '.wav',
    '.ogg',
    '.flac'
];

/*
|----------------------------------------------------------------------
| Database
|----------------------------------------------------------------------
*/

linvodb.defaults.store = {
    db: leveljs
};
linvodb.path = pathUserData;

const Song = new linvodb('song', {
    album: String,
    albumartist: [String],
    artist: [String],
    cover: {
        default: null
    },
    disk: {
        no: Number,
        of: Number
    },
    duration: Number,
    genre: [String],
    loweredMetas: {
        album: String,
        albumartist: [String],
        artist: [String],
        genre: [String],
        title: String
    },
    path: String,
    playCount: Number,
    title: String,
    track: {
        no: Number,
        of: Number
    },
    year: String
});

const Album = new linvodb('album', {
    artists: [String],
    cover: {
        default: null
    },
    duration: Number,
    loweredMetas: {
        title: String
    },
    songsList: [String],
    title: String,
    tracks: Number,
    year: String
});

Song.ensureIndex({
    fieldName: 'path',
    unique: true
});

const models = {
    Album,
    Song
};

Promise.promisifyAll(models.Song);
Promise.promisifyAll(models.Album);

/*
|----------------------------------------------------------------------
| Exports
|----------------------------------------------------------------------
*/

export default {
    browserWindows,
    config: conf,
    initialConfig: conf.getAll(),
    models,
    pathSrc,
    supportedExtensions,
    version: app.getVersion()
};
