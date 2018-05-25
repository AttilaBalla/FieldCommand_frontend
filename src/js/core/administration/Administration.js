import React from "react";
import {AdminSidebar} from "./AdminSidebar";
import {sidebarTypes} from "./SidebarItem";
import {UserAdmin} from "./useradmin/UserAdmin";

export class Administration extends React.Component {

    constructor(props) {
        super(props);

        this.state = {requestedComponent: ""};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(requestedPage) {
        console.log("changing to: " + requestedPage);
        this.setState({requestedComponent: requestedPage});
    }

    render() {

        let adminComponent = "";

        switch(this.state.requestedComponent) {
            case sidebarTypes.USERS.text:
                adminComponent = <UserAdmin/>;
                break;
            default:
                break;
        }

        return(
            <div className="row">
                <nav className="col-md-2 d-md-block sidebar">
                    <AdminSidebar onChange={this.handleChange}/>
                </nav>
                <div className="col-md-10 admin_container">
                    {adminComponent}
                </div>

            </div>
        )
    }
}