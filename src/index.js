import 'babel-polyfill';
import React from 'react';
import {render as renderReact} from 'react-dom';

renderReact(
    <div><h1>Hello from React</h1></div>,
    document.getElementById('react-content')
);
