const teeny = require('teeny-conf');
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

        if (configChanged) {
            this.conf.saveSync();
        }
    }

    getDefaultConfig() {
        return {
            bounds: {
                height: 720,
                width: 1280
            },
            devMode: true,
            minimizeToTray: true,
            musicFolders: [],
            useNativeFrame: false
        };
    }

    getConfig() {
        return this.conf.getAll();
    }
}

module.exports = ConfigManager;
