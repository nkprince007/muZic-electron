import linvodb from 'linvodb3';
import leveljs from 'level-js';
import Promise from 'bluebird';
import teeny from 'teeny-conf';
import path from 'path';

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

linvodb.defaults.store = { db: leveljs };
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
    path: String,
    playCount: Number,
    title: String,
    track: {
        no: Number,
        of: Number
    },
    year: String,
    loweredMetas: {
        artist: [String],
        album: String,
        genre: [String],
        title: String,
        albumartist: [String]
    }
});

const Album = new linvodb('album', {
    title: String,
    artists: [String],
    cover: {
        default: null
    },
    year: String,
    songsList: [Document],
    tracks: Number,
    duration: Number
});

Song.ensureIndex({ fieldName: 'path', unique: true });
Album.ensureIndex({ fieldName: 'title', unique: true });

const models = {
    Song,
    Album
};

Promise.promisifyAll(models.Song);
Promise.promisifyAll(models.Album);

/*
|----------------------------------------------------------------------
| Exports
|----------------------------------------------------------------------
*/

export default {
    supportedExtensions,
    pathSrc,
    browserWindows,
    models,
    version: app.getVersion(),
    config: conf,
    initialConfig: conf.getAll(),
};
