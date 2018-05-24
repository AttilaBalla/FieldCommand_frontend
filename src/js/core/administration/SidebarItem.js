import React from 'React';

export const sidebarTypes = {
    TITLE: {
        classElement: "centered font-weight-bold sidebar_title",
        text: "Administration"
    },
    GENERAL: {
        classElement: "nav-item sidebar_button",
        icon: "fa fa-cogs",
        text: "General"
    },
    GAMEREPORTS: {
        classElement: "nav-item sidebar_button",
        icon: "fa fa-fire-extinguisher",
        text: "Game Reports"
    },
    RELEASES: {
        classElement: "nav-item sidebar_button",
        icon: "fa fa-upload",
        text: "Releases"
    },
    USERS: {
        classElement: "nav-item sidebar_button",
        icon: "fa fa-user",
        text: "users"
    }
};

export function SidebarItem(props) {

    let classElement, icon, text = "";

    switch(props.itemType) {
        case sidebarTypes.TITLE:
            classElement = sidebarTypes.TITLE.classElement;
            text = sidebarTypes.TITLE.text;
            break;
        case sidebarTypes.GENERAL:
            classElement = sidebarTypes.GENERAL.classElement;
            icon = sidebarTypes.GENERAL.icon;
            text = sidebarTypes.GENERAL.text;
            break;
        case sidebarTypes.GAMEREPORTS:
            classElement = sidebarTypes.GAMEREPORTS.classElement;
            icon = sidebarTypes.GAMEREPORTS.icon;
            text = sidebarTypes.GAMEREPORTS.text;
            break;
        case sidebarTypes.RELEASES:
            classElement = sidebarTypes.RELEASES.classElement;
            icon = sidebarTypes.RELEASES.icon;
            text = sidebarTypes.RELEASES.text;
            break;
        case sidebarTypes.USERS:
            classElement = sidebarTypes.USERS.classElement;
            icon = sidebarTypes.USERS.icon;
            text = sidebarTypes.USERS.text;
            break;
        default:
            break;
    }

    if(classElement.contains("sidebar_title")) {
        return(
            <li className={classElement}>
                {text}
            </li>
        )
    } else {
        return(
            <li className={classElement}>
                <span className={icon}></span>
                {text}
            </li>
        )
    }
}
