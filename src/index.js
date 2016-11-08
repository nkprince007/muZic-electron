import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';

import { Provider } from 'react-redux';

import routes from './router/routes';
import store from './store';

// Bootstrap and jQuery
window.jQuery = window.$ = require('../dist/js/jquery.min');
require('../dist/js/bootstrap.min');
require('../dist/css/bootstrap.min.css');
require('../dist/js/main');

// Stylesheets
require('./styles/_main.scss');
require('./styles/_header.scss');
require('./styles/_footer.scss');
require('./styles/_library.scss');

ReactDOM.render(
    <Provider store={ store }>
        <Router history={ hashHistory } routes={ routes } />
    </Provider>,
    document.getElementById('react-content')
);
