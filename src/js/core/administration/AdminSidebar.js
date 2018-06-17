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
        this.props.onChange(activeItem);

    }

    render() {

        return (
            <ul className="nav flex-column side_navbar">
                <SidebarItem classElement="centered font-weight-bold sidebar_title"
                             text="Administration"
                />
                {sidebarTypes.map((menuItem, key) => {
                    return(
                        <SidebarItem
                            key={key}
                            classElement={menuItem.classElement}
                            icon={menuItem.icon}
                            text={menuItem.text} onClick={this.handleClick}
                            highlighted={(this.state.highlightedItem === menuItem.text) ? "highlighted" : "" }
                        />
                    )
                })}
            </ul>
        )
    }
}