import React from "react";
import {entryTypes} from "./TimelineEntryTypes.js";
import {TimelineEntry} from "./TimelineEntry";

export class Timeline extends React.Component {

    render() {
        return (
            <div id="sidebar" className="col-md-3">
                <TimelineEntry entryType={entryTypes.REPORT}>
                    <p>Game report title</p>
                    <p>24-3-2018 21:01</p>
                </TimelineEntry>
                <TimelineEntry entryType={entryTypes.REPORT}>
                    <p>Game report title</p>
                    <p>21-3-2018 20:24</p>
                </TimelineEntry>
                <TimelineEntry entryType={entryTypes.BLOG}>
                    <p>Some blog post title here</p>
                    <p>24-3-2018 18:36</p>
                </TimelineEntry>
                <TimelineEntry entryType={entryTypes.RELEASE}>
                    <p>ROTR [version]</p>
                    <p>23-3-2018 12:54</p>
                </TimelineEntry>
                <TimelineEntry entryType={entryTypes.REPORT}>
                    <p>Game report title</p>
                    <p>21-3-2018 20:45</p>
                </TimelineEntry>
                <TimelineEntry entryType={entryTypes.REPORT}>
                    <p>Game report title</p>
                    <p>21-3-2018 20:45</p>
                </TimelineEntry>
                <TimelineEntry entryType={entryTypes.BLOG}>
                    <p>Game report title</p>
                    <p>21-3-2018 20:45</p>
                </TimelineEntry>
                <TimelineEntry entryType={entryTypes.REPORT}>
                    <p>Game report title</p>
                    <p>21-3-2018 20:45</p>
                </TimelineEntry>
                <TimelineEntry entryType={entryTypes.HISTORY}>
                    <p>Timeline history</p>
                </TimelineEntry>
            </div>
        )
    }
}