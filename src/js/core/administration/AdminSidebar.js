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
        this.setState({highlightedItem: activeItem});

    }

    render() {

        let rolePower = this.props.user.rolePower;
        return (
            <ul className="nav flex-column side_navbar">
                <SidebarItem classElement="centered font-weight-bold sidebar_title"
                             text="Administration"
                />
                {sidebarTypes.map((menuItem, key) => {

                    if(rolePower >= menuItem.rolePower) {

                        return (
                            <SidebarItem
                                key={key}
                                link={menuItem.link}
                                classElement={menuItem.classElement}
                                icon={menuItem.icon}
                                text={menuItem.text} onClick={this.handleClick}
                                highlighted={(this.state.highlightedItem === menuItem.text) ? "highlighted" : ""}
                            />
                        )
                    } else {
                        return null;
                    }
                })}
            </ul>
        )
    }
}