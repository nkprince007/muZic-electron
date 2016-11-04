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
    '.ogg'
]

/*
|----------------------------------------------------------------------
| Exports
|----------------------------------------------------------------------
*/

export default {
    supportedExtensions,
    pathSrc,
    browserWindows,
    version: app.getVersion(),
    config: conf,
    initialConfig: conf.getAll(),
};