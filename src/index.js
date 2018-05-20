import React from 'react';
import { render } from 'react-dom';
import './css/main.css';
import registerServiceWorker from './js/registerServiceWorker';
import { App } from "./js/App.js";

render(
        <App/>,
    document.getElementById('root'),
    registerServiceWorker()
);