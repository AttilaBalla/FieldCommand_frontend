import React from 'react';
import { render } from 'react-dom';
import './css/main.css';
import registerServiceWorker from './js/main/registerServiceWorker';
import { App } from "./js/main/App.js";

render(
        <App/>,
    document.getElementById('root'),
    registerServiceWorker()
);