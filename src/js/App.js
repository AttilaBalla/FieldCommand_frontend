import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { Navbar } from "./Navbar.js";
import { HomeContainer, AboutContainer } from "./core/Cores";

import { Footer } from "./Footer";
import '../css/sidebar.css';

export class Main extends Component {

    render() {
        return (
            <div>
                <Navbar/>
                    <Route exact path='/' component={HomeContainer}/>
                    <Route exact path='/about' component={AboutContainer}/>
                <Footer/>
            </div>
    )
  }
}
