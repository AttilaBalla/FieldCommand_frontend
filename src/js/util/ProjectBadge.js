import React from "react";
import ReactTooltip from 'react-tooltip'

export function ProjectBadge(props) {

    let projectIcon, projectName, toolTip;

    switch(props.project) {
        case "ROTR":
            projectIcon = <img className="mr-2" src="/img/russia_icon.png" width="40" height="30" alt=""/>;
            projectName = "Rise of the Reds";
            break;
        case "SWRNET":
            projectIcon = <img className="mr-2" src="/img/swrnet_icon.png" width="40" height="30" alt=""/>;
            projectName = "SWR.net";
            break;
        case "FIELDCOMMAND":
            projectIcon = <img className="mr-2" src="/img/fc_icon.png" width="40" height="30" alt=""/>;
            projectName = "Fieldcommand";
            break;
        default:
            break;
    }

    toolTip = (props.displayName)
        ? null
        :
        <ReactTooltip place="top" type="dark" effect="solid">
            {projectName}
        </ReactTooltip>;

    return(
        <React.Fragment>
            <span className="badge badge_project ml-2" data-tip={(props.displayName) ? null : "React-tooltip"}>
                {projectIcon}{(props.displayName) ? projectName : null}
            </span>
            {toolTip}
        </React.Fragment>
    )
}