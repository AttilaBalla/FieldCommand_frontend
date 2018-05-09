import React from "react";
import {Newsfeed} from "./newsfeed/Newsfeed.js";
import {Timeline} from "./timeline/Timeline.js";

export class Core extends React.Component {

    render() {
        return (
            <div className="row core_container">
                <Newsfeed/>
                <Timeline/>
            </div>
        )
    }
}