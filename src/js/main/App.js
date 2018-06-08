import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Login} from "../util/Login";
import {Main} from "../core/Cores.js"
import {Provider} from "../util/UserProvider";
import {Activate} from "../util/Activate";

export class App extends React.Component {
    render() {
        return(
            <Provider>
                <Router>
                    <Switch>
                        <Route path='/activate/:id' component={Activate}/>
                        <Route exact path='/login' component={Login}/>
                        <Route path='/' component={Main}/>
                    </Switch>
                </Router>
            </Provider>
        )
    }
}


