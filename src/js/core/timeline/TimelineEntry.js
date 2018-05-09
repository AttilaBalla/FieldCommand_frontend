import React from "react";
import { entryTypes } from "./TimelineEntryTypes.js";

export function TimelineEntry(props) {

    let classElement;
    let icon;

    switch(props.entryType) {
        case entryTypes.REPORT:
            classElement = entryTypes.REPORT.classElement;
            icon = entryTypes.REPORT.icon;
            break;

        case entryTypes.BLOG:
            classElement = entryTypes.BLOG.classElement;
            icon = entryTypes.BLOG.icon;
            break;

        case entryTypes.RELEASE:
            classElement = entryTypes.RELEASE.classElement;
            icon = entryTypes.RELEASE.icon;
            break;

        case entryTypes.HISTORY:
            classElement = entryTypes.HISTORY.classElement;
            icon = entryTypes.HISTORY.icon;
            break;
        default:
            break;
    }

    return(
        <div className = {classElement} >
            <span className = {icon} aria-hidden="true"></span>
            <div className="timeline_content">
                {props.children}
            </div>
        </div>
    )
}

