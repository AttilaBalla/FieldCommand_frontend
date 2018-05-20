import React, {Component} from "react";
import { Newsfeed } from "./newsfeed/Newsfeed.js";
import { Timeline } from "./timeline/Timeline.js";
import { AboutContent } from "./about/AboutContent";
import { Banner } from "./banners/Banner";
import Route from "react-router-dom/es/Route";
import {Navbar} from "../Navbar";
import {Footer} from "../Footer";

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

export class HomeContainer extends React.Component {

    render() {
        return (
            <div>
                <Banner/>
                <div className="row core_container">
                    <Newsfeed/>
                    <Timeline/>
                </div>
            </div>
        )
    }
}

export class AboutContainer extends React.Component {

    render() {
        return (
            <div className="container-fluid">
                <AboutContent/>
            </div>
        )
    }
}