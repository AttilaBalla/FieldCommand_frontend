import React, { Component } from 'react';
import '../css/sidebar.css';
import { Navbar } from "./Navbar.js";
import { Banner } from "./Banner.js";
import { HomeContainer } from "./core/Cores.js";
import { AboutContainer } from "./core/Cores.js";
import { Footer } from "./Footer";

export class Home extends Component {
    render() {
        return (
            <div className="Home">
                <Navbar/>
                <Banner/>
                <HomeContainer/>
                <Footer/>
            </div>
    );
  }
}

export class About extends Component {
    render() {
        return (
            <div className="About">
                <Navbar/>
                <AboutContainer/>
                <Footer/>
            </div>
        )
    }
}
