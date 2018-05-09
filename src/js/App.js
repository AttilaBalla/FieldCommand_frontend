import React, { Component } from 'react';
import '../css/App.css';
import { Navbar } from "./Navbar.js";
import { Banner } from "./Banner.js";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navbar/>
                <Banner/>
            </div>
    );
  }
}

export default App;
