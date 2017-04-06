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
    'app-version': app.version,
    'arch': ['ia32', 'x64'],
    'build-version': app.version,
    'dir': './',
    'icon': '',
    'ignore': /(build|node_modules\/+?(?!teeny).+)/,
    'name': 'muZic',
    'out': path.join('build', 'dist', app.version),
    'overwrite': true,
    'platform': ['darwin', 'linux', 'win32'],
    'prune': true,
    'version': app.electron_version
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
