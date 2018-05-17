import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Main } from './js/App';
import { Login } from './js/Login'
import './css/main.css';
import registerServiceWorker from './js/registerServiceWorker';

render(
    <Router>
        <Switch>
            <Route exact path='/login' component={Login}/>
            <Route path='/' component={Main}/>
        </Switch>
    </Router>,
    document.getElementById('root'),
    registerServiceWorker()
);