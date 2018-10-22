import React from "react";

export function UserCardIcon(props) {
    return(
        <span className="text-secondary ml-2 small d-block">
            <i className={"mr-2 " + props.iconClass} aria-hidden="true"></i>
            {props.description}
        </span>
    )
}
