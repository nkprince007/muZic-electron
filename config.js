const teeny = require('teeny-conf');
const electron = require('electron');
const path = require('path');

class ConfigManager {
    constructor(app) {
        const defaultConfig = this.getDefaultConfig();
        const pathUserData = app.getPath('userData');

        this.conf = new teeny(path.join(pathUserData, 'config.json'));
        this.conf.loadOrCreateSync(defaultConfig);

        let configChanged = false;
        
        for (const key in defaultConfig) {
            if (this.conf.get(key) === undefined) {
                this.conf.set(key, defaultConfig[key]);
                configChanged = true;
            }
        }

        if(configChanged) 
            this.conf.saveSync();
    }

    getDefaultConfig() {
        return {
            musicFolders: [],
            useNativeFrame: false,
            minimizeToTray: true,
            devMode: true,
            bounds: {
                width: 1280,
                height: 720
            }
        };
    }

    getConfig() {
        return this.conf.getAll();
    }
}

module.exports = ConfigManager;
