import React from 'react';
import { Route, IndexRedirect } from 'react-router';

//Actions
// import AppActions from '../actions/AppActions';

//Components
import App from '../components/App.react';

//Initializer
const init = {

    app: () => {
        console.log('App Initialized');
        // AppActions.init();
    }

};

// Router
const routes = (
    <Route component={ App } path='/' onEnter={ init.app }></Route>
);


export default routes;
