import React, {Component} from "react";
import { Newsfeed } from "./newsfeed/Newsfeed.js";
import { Timeline } from "./timeline/Timeline.js";
import { AboutContent } from "./about/AboutContent";
import { Banner } from "./banners/Banner";
import Route from "react-router-dom/es/Route";
import {Navbar} from "../Navbar";
import {Footer} from "../Footer";
import {Administration} from "./administration/Administration";
import '../../css/sidebar.css';
import '../../css/admin.css';



export class Main extends Component {

    render() {
        return (
            <div>
                <Navbar/>
                <Route exact path='/' component={HomeContainer}/>
                <Route exact path='/about' component={AboutContainer}/>
                <Route exact path='/administration' component={AdminContainer}/>
                <Footer/>
            </div>
        )
    }
}

class HomeContainer extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Banner/>
                <div className="row core_container">
                    <Newsfeed/>
                    <Timeline/>
                </div>
            </React.Fragment>
        )
    }
}

class AboutContainer extends React.Component {

    render() {
        return (
            <div className="container-fluid">
                <AboutContent/>
            </div>
        )
    }
}

class AdminContainer extends React.Component {

    render() {
        return (
            <div className="container-fluid core_container">
                <Administration/>
            </div>
        )
    }
}