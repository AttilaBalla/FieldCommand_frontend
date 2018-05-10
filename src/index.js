import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { About, Home } from './js/App';
import './css/main.css';
import registerServiceWorker from './js/registerServiceWorker';

render(
    <Router>
        <div>
            <Route exact path="/" component={Home}/>
            <Route exact path="/about" component={About}/>
        </div>
    </Router>,
    document.getElementById('root')
);