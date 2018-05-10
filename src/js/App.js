import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { Navbar } from "./Navbar.js";
import { HomeContainer } from "./core/Cores.js";
import { AboutContainer } from "./core/Cores.js";
import { Footer } from "./Footer";
import '../css/sidebar.css';

export class Main extends Component {

    render() {
        return (
            <div>
                <Navbar/>
                <Router>
                    <switch>
                        <Route exact path='/' component={HomeContainer}/>
                        <Route exact path='/about' component={AboutContainer}/>
                    </switch>
                </Router>
                <Footer/>
            </div>
    )
  }
}
