import React from 'react';
import { Route, IndexRedirect } from 'react-router';

//Actions
import AppActions from '../actions/AppActions';

//Components
import App from '../components/App.react';
import Library from '../components/Library/Library.react';
import Songs from '../components/Library/Songs.react';
import Albums from '../components/Library/Albums.react';
import Settings from '../components/Settings/Settings.react';
import SettingsLibrary from '../components/Settings/SettingsLibrary.react';

//Initializer
const init = {
    app: () => {
        AppActions.init();
    }
};

// Router
const routes = (
    <Route component={ App } path='/' onEnter={ init.app }>
        <IndexRedirect to="library" />
        <Route component={ Library } path="library">
            <IndexRedirect to="songs" />
            <Route component={ Songs } path="songs" />
            <Route component={ Albums } path="albums" />
            <Route component={ Albums } path="artists" />
        </Route>
        <Route component={ Settings } path="settings">
            <IndexRedirect to="library" />
            <Route component = { SettingsLibrary } path="library" />
        </Route>
    </Route>
);


export default routes;
