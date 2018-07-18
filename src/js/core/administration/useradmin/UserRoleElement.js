import React from "react";

export const userRoles = [
    {
        roleName: "ROLE_ADMIN",
        badgeColor: "badge badge-danger ml-2",
        displayName: "Admin"
    },
    {
        roleName: "ROLE_DEVELOPER",
        badgeColor: "badge badge-warning ml-2",
        displayName: "Developer"
    },
    {
        roleName: "ROLE_USER",
        badgeColor: "badge badge-primary ml-2",
        displayName: "User"
    },
    {
        roleName: "ROLE_DISABLED",
        badgeColor: "badge badge-dark ml-2",
        displayName: "Disabled"
    },
    ];

export function UserRoleElement(props) {

    return(
        <React.Fragment>
            <input
                type="radio"
                name="role"
                value={props.role}
                defaultChecked={(props.checked) ? "checked" : ""}
                onChange={props.handleChange}/>
            <span className={props.badgeColor}>{props.displayName}</span>
        </React.Fragment>
        )
}