import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';

import { Provider } from 'react-redux';

import routes from './router/routes';
import store from './store';

// Bootstrap and jQuery
require('../dist/js/main');

// Stylesheets
require('./styles/_main.scss');

ReactDOM.render(
    <Provider store={ store }>
        <Router history={ hashHistory } routes={ routes } />
    </Provider>,
    document.getElementById('react-content')
);
