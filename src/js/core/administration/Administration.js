import React from "react";
import {AdminSidebar} from "./AdminSidebar";

export class Administration extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(requestedPage) {
        console.log("changing to: " + requestedPage);
    }

    render() {
        return(
            <div className="row">
                <AdminSidebar onChange={this.handleChange}/>
            </div>
        )
    }
}