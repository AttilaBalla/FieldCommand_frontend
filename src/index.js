import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { Main } from './js/App';
import './css/main.css';
import registerServiceWorker from './js/registerServiceWorker';

render(
    <Router>
        <switch>
            <Route exact path="(/|/about)" component={Main}/>
        </switch>
    </Router>,
    document.getElementById('root'),
    registerServiceWorker()
);