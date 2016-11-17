'use strict';

process.env.NODE_ENV = 'production';

const fs = require('fs');
const path = require('path');

const packager = require('electron-packager');
const rimraf = require('rimraf');
const app = require('./package.json');

function getDir(srcPath) {
    return fs.readdirSync(srcPath).filter((file) => {
        return fs.statSync(path.join(srcPath, file)).isDirectory();
    });
}

const options = {
    'dir': './',
    'name': 'muZic',
    'platform': ['darwin', 'linux', 'win32'],
    'arch': ['ia32', 'x64'],
    'version': app.electron_version,
    'icon': '',
    'build-version': app.version,
    'app-version': app.version,

    //optional
    'prune': true,
    'ignore': /(build|node_modules\/+?(?!teeny).+)/,
    'out': path.join('build', 'dist', app.version),
    'overwrite': true
};

console.info(`Starting muZic ${app.version} build`);

packager(options, (err) => {
    if(err) throw err;
    else {
        console.info('Builds cleanup');
        const versionPath = path.join(__dirname, 'build', 'dist', app.version);
        const buildsPaths = getDir(versionPath);

        buildsPaths.forEach((folder) => {
            const appPath = path.join(versionPath, folder, 'resources', 'app');
            rimraf(`${appPath}/dist/`, {}, () => {});
        });
    }
});
