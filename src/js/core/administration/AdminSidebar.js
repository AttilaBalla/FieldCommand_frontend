import React from 'react';
import {SidebarItem, sidebarTypes} from "./SidebarItem";

export function AdminSidebar(props) {
    return(
        <nav className="col-md-2 d-none d-md-block sidebar">
            <div className="sidebar-sticky">
                <ul className="nav flex-column side_navbar">
                    <SidebarItem itemType={sidebarTypes.TITLE}/>
                    <SidebarItem itemType={sidebarTypes.GENERAL}/>
                    <SidebarItem itemType={sidebarTypes.GAMEREPORTS}/>
                    <SidebarItem itemType={sidebarTypes.RELEASES}/>
                    <SidebarItem itemType={sidebarTypes.USERS}/>
                </ul>
            </div>
        </nav>
    )
}