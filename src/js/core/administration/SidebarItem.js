import React from 'react';
import {Link} from "react-router-dom";


export const sidebarTypes = [
    {
        link: "/administration/general",
        classElement: "nav-item sidebar_button",
        icon: "fa fa-cogs",
        text: "General",
        rolePower: 1 // To be implemented
    },
    {
        link: "/administration/newsfeed",
        classElement: "nav-item sidebar_button",
        icon: "fa fa-file-text-o",
        text: "Newsfeed",
        rolePower: 20
    },
    {
        link: "/administration/gamereports",
        classElement: "nav-item sidebar_button",
        icon: "fa fa-fire-extinguisher",
        text: "Game Reports",
        rolePower: 1 // To be implemented
    },
    {
        link: "/administration/releases",
        classElement: "nav-item sidebar_button",
        icon: "fa fa-upload",
        text: "Releases",
        rolePower: 1 // To be implemented
    },
    {
        link: "/administration/users",
        classElement: "nav-item sidebar_button",
        icon: "fa fa-user",
        text: "Users",
        rolePower: 30
    }
];

export class SidebarItem extends React.Component{

    constructor(props) {
        super(props);

        this.classElement = props.classElement;
        this.icon = props.icon;
        this.text = props.text;
        this.link = props.link;

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick(this.text);
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
                <Link to={this.link}>
                    <li className={this.classElement + " " + this.props.highlighted} onClick={this.handleClick}>
                        <span className={"mr-2 " + this.icon}></span>
                        {this.text}
                    </li>
                </Link>
            )
        }
    }
}
