import React from "react";
import ReactTooltip from 'react-tooltip'

export const projectBadges = {
    ROTR:
        {
            projectIcon: <img className="mr-2" src="/img/russia_icon.png" width="40" height="30" alt=""/>,
            projectName: "Rise of the Reds",
            projectShortName: "ROTR"
        },
    SWRNET:
        {
            projectIcon: <img className="mr-2" src="/img/swrnet_icon.png" width="40" height="30" alt=""/>,
            projectName: "SWR.net",
            projectShortName: "SWRNET"
        },
    FC:
        {
            projectIcon: <img className="mr-2" src="/img/fc_icon.png" width="40" height="30" alt=""/>,
            projectName: "Fieldcommand",
            projectShortName: "FC"
        }
};

export function ProjectBadge(props) {

    let projectName, projectIcon;

    switch(props.project) {
        case "ROTR":
            projectName = projectBadges.ROTR.projectName;
            projectIcon = projectBadges.ROTR.projectIcon;
            break;
        case "SWRNET":
            projectName = projectBadges.SWRNET.projectName;
            projectIcon = projectBadges.SWRNET.projectIcon;
            break;
        case "FC":
            projectName = projectBadges.FC.projectName;
            projectIcon = projectBadges.FC.projectIcon;
            break;
        default:
            break;
    }

    let toolTip = (props.displayName)
        ? null
        :
        <ReactTooltip place="top" type="dark" effect="solid">
            {projectName}
        </ReactTooltip>;

    return(
        <React.Fragment>
            <span className="badge badge_project" data-tip={(props.displayName) ? null : "React-tooltip"}>
                {projectIcon}{(props.displayName) ? projectName : null}
            </span>
            {toolTip}
        </React.Fragment>
    )
}