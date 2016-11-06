import 'babel-polyfill';
import React from 'react';
import { render as renderReact } from 'react-dom';
import { Router, hashHistory } from 'react-router';
import routes from './router/routes';

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

renderReact(
    <Router history={hashHistory} routes={routes} />,
    document.getElementById('react-content')
);
