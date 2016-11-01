import 'babel-polyfill';
import React from 'react';
import {render as renderReact} from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import routes from './router/routes';

// Bootstrap and jQuery
window.jQuery = window.$ = require('../dist/js/jquery.min.js')
require('../dist/js/bootstrap.min.js')
require('../dist/css/bootstrap.min.css')

// Stylesheets
require('./styles/_main.scss')
require('./styles/_header.scss')
require('./styles/_footer.scss')

renderReact(
    <Router history={hashHistory} routes={ routes }/>,
    document.getElementById('react-content')
);
