import React from 'react';
import {SidebarItem, sidebarTypes} from "./SidebarItem";

export class AdminSidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            highlightedItem: ""
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(activeItem) {
        this.setState({highlightedItem: activeItem.text});
        this.props.onChange(activeItem.text);

    }

    render() {
        return (
            <nav className="col-md-2 d-none d-md-block sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column side_navbar">
                        <SidebarItem itemType={sidebarTypes.TITLE}/>
                        <SidebarItem
                            itemType={sidebarTypes.GENERAL}
                            onClick={this.handleClick}
                            highlighted={
                                this.state.highlightedItem === sidebarTypes.GENERAL.text ? "highlighted" : "" }/>
                        <SidebarItem
                            itemType={sidebarTypes.GAMEREPORTS}
                            onClick={this.handleClick}
                            highlighted={
                                this.state.highlightedItem === sidebarTypes.GAMEREPORTS.text ? "highlighted" : "" }/>
                        <SidebarItem
                            itemType={sidebarTypes.RELEASES}
                            onClick={this.handleClick}
                            highlighted={
                                this.state.highlightedItem === sidebarTypes.RELEASES.text ? "highlighted" : "" }/>
                        <SidebarItem
                            itemType={sidebarTypes.USERS}
                            onClick={this.handleClick}
                            highlighted={
                                sidebarTypes.USERS.text === this.state.highlightedItem ? "highlighted" : ""}></SidebarItem>
                    </ul>
                </div>
            </nav>
        )
    }
}