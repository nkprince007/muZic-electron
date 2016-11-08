const electron = require('electron');
const path = require('path');
const url = require('url');

// const ConfigManager = require('./config');

const app = electron.app;
// const nativeImage = electron.nativeImage;
const BrowserWindow = electron.BrowserWindow;

const appRoot = path.resolve(__dirname);
// const srcPath = path.join(appRoot, 'src');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        title: 'muZic',
        width: 1280,
        height: 720,
        minWidth: 1280,
        minHeight: 720,
        frame: false,
        show: false
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(appRoot, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', () => {
  // const configManager = new ConfigManager(app);
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
