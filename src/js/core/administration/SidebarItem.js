import React from 'react';

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
        text: "Users"
    }
};

export class SidebarItem extends React.Component{

    constructor(props) {
        super(props);

        this.classElement = "";
        this.icon = "";
        this.text = "";

        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        switch (this.props.itemType) {
            case sidebarTypes.TITLE:
                this.classElement = sidebarTypes.TITLE.classElement;
                this.text = sidebarTypes.TITLE.text;
                break;
            case sidebarTypes.GENERAL:
                this.classElement = sidebarTypes.GENERAL.classElement;
                this.icon = sidebarTypes.GENERAL.icon;
                this.text = sidebarTypes.GENERAL.text;
                break;
            case sidebarTypes.GAMEREPORTS:
                this.classElement = sidebarTypes.GAMEREPORTS.classElement;
                this.icon = sidebarTypes.GAMEREPORTS.icon;
                this.text = sidebarTypes.GAMEREPORTS.text;
                break;
            case sidebarTypes.RELEASES:
                this.classElement = sidebarTypes.RELEASES.classElement;
                this.icon = sidebarTypes.RELEASES.icon;
                this.text = sidebarTypes.RELEASES.text;
                break;
            case sidebarTypes.USERS:
                this.classElement = sidebarTypes.USERS.classElement;
                this.icon = sidebarTypes.USERS.icon;
                this.text = sidebarTypes.USERS.text;
                break;
            default:
                break;
        }
    }

    handleClick() {
        this.props.onClick(this.props.itemType);
    }

    render() {

        if (this.classElement.includes("sidebar_title")) {
            return (
                <li className={this.classElement}>
                    {this.text}
                </li>
            )
        } else {
            return (
                <li onClick={this.handleClick} className={this.classElement + " " + this.props.highlighted}>
                    <span className={"mr-2 " + this.icon}></span>
                    {this.text}
                </li>
            )
        }
    }
}
