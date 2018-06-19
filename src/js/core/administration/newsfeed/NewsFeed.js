import React from "react";
import {NewsEditor} from "./NewsEditor";
import {Alert} from "../../../util/Alert";


export class NewsFeed extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            alertType: ""
        };

        this.setAlert = this.setAlert.bind(this);
    }

    setAlert(alert) {
        this.setState({
            alertType: alert.alertType,
            message: alert.message,
        })
    }

    render() {

        let alert = (this.state.alertType)
            ? <Alert alertType={this.state.alertType} message={this.state.message}/>
            : null;

        return(
            <React.Fragment>
                {alert}
                <NewsEditor sendAlert={this.setAlert}/>
            </React.Fragment>
        )
    }

}