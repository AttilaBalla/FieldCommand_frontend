import React, { Component } from 'react';
import ReactDOM from "react-dom";
import './css/App.css';
import { Navbar } from "./js/navbar.js";
import registerServiceWorker from "./js/registerServiceWorker";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navbar/>
            </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
