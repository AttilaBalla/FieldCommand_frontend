import React, { Component } from 'react';
import '../css/sidebar.css';
import { Navbar } from "./Navbar.js";
import { Banner } from "./Banner.js";
import { Core } from "./core/Core.js";
import {Footer} from "./Footer";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navbar/>
                <Banner/>
                <Core/>
                <Footer/>
            </div>
    );
  }
}

export default App;
