// Styles and Scripts
import '../dist/js/main';

import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';

import React from 'react';
import ReactDOM from 'react-dom';

import routes from './router/routes';
import store from './store';

ReactDOM.render(
    <Provider store={ store }>
        <Router history={ hashHistory } routes={ routes } />
    </Provider>,
    document.getElementById('react-content')
);
