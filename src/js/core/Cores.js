import React from "react";
import {Newsfeed} from "./newsfeed/Newsfeed.js";
import {Timeline} from "./timeline/Timeline.js";
import {AboutContent} from "./about/AboutContent";

export class HomeContainer extends React.Component {

    render() {
        return (
            <div className="row core_container">
                <Newsfeed/>
                <Timeline/>
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