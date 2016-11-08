import linvodb from 'linvodb3';
import leveljs from 'level-js';
import Promise from 'bluebird';
import teeny from 'teeny-conf';
import electron from 'electron';
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
    year: String
});

Song.ensureIndex({ fieldName: 'path', unique: true });

const models = {
    Song
};

Promise.promisifyAll(models.Song);

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
