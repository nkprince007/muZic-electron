const electron = require('electron');
const path = require('path');
const url = require('url');

const ConfigManager = require('./config');

const app = electron.app;
// const nativeImage = electron.nativeImage;
const BrowserWindow = electron.BrowserWindow;

const appRoot = path.resolve(__dirname);
// const srcPath = path.join(appRoot, 'src');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        frame: false,
        height: 720,
        minHeight: 720,
        minWidth: 1280,
        show: false,
        title: 'muZic',
        width: 1280
    });

    if (process.env.ENV === 'development') {
        mainWindow.loadURL(url.format({
            pathname: 'http://localhost:8080/index.html'
        }));
    } else {
        mainWindow.loadURL(url.format({
            pathname: path.join(appRoot, 'index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', () => {
    new ConfigManager(app);
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

app.setName('muZic');
