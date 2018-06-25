import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Login} from "../util/Login";
import {Main} from "../core/Cores.js"
import {UserProvider} from "../util/UserProvider";
import {Activate} from "../util/Activate";
import {ACCESS_TOKEN} from "../util/Constants";

export class App extends React.Component {
    render() {
        return(
            <UserProvider>
                <Router>
                    <Switch>
                        <Route path='/activate/:id' component={(localStorage.getItem(ACCESS_TOKEN)) ? Main : Activate}/>
                        <Route exact path='/login' component={(localStorage.getItem(ACCESS_TOKEN)) ? Main : Login}/>
                        <Route path='/' component={Main}/>
                    </Switch>
                </Router>
            </UserProvider>
        )
    }
}


