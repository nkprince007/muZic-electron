import React from 'react';
import { Route, IndexRedirect } from 'react-router';

//Actions
import AppActions from '../actions/AppActions';

//Components
import App from '../components/App.react';
import Library from '../components/Library/Library.react';
import Songs from '../components/Library/Songs.react';

//Initializer
const init = {

    app: () => {
        AppActions.init();
    },

    library: () => {
    }

};

// Router
const routes = (
    <Route component={ App } path='/' onEnter={ init.app }>
        <IndexRedirect to="library" />
        <Route component={ Library } path="library" onEnter={ init.library }>
            <IndexRedirect to="songs" />
            <Route component={ Songs } path="songs" />
        </Route>
    </Route>
);


export default routes;
