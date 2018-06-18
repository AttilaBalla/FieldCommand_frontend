import React from "react";
import {NewsEditor} from "./NewsEditor";
import {Alert} from "../../../util/Alert";


export class NewsFeed extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            alertType: ""
        }
    }

    render() {

        let alert = (this.state.alertType)
            ? <Alert alertType={this.state.alertType} message={this.state.message}/>
            : null;

        return(
            <React.Fragment>
                {alert}
                <NewsEditor/>
            </React.Fragment>
        )
    }

}