import React from 'react';


export const sidebarTypes = [
    {
        classElement: "nav-item sidebar_button",
        icon: "fa fa-cogs",
        text: "General"
    },
    {
        classElement: "nav-item sidebar_button",
        icon: "fa fa-file",
        text: "Newsfeed"
    },
    {
        classElement: "nav-item sidebar_button",
        icon: "fa fa-fire-extinguisher",
        text: "Game Reports"
    },
    {
        classElement: "nav-item sidebar_button",
        icon: "fa fa-upload",
        text: "Releases"
    },
    {
        classElement: "nav-item sidebar_button",
        icon: "fa fa-user",
        text: "Users"
    }
];

export class SidebarItem extends React.Component{

    constructor(props) {
        super(props);

        this.classElement = props.classElement;
        this.icon = props.icon;
        this.text = props.text;

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
                <li onClick={this.handleClick} className={this.classElement + " " + this.props.highlighted}>
                    <span className={"mr-2 " + this.icon}></span>
                    {this.text}
                </li>
            )
        }
    }
}
