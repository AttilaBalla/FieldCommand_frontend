import React from "react";
import {UserInvite} from "./UserInvite";
import {UserEdit} from "./UserEdit";
import {Alert} from "../../../util/Alert.js";

export class UserAdmin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            alertType: null
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

        return (
            <React.Fragment>
                {alert}
                <UserInvite sendAlert={this.setAlert}/>
                <UserEdit sendAlert={this.setAlert}/>
            </React.Fragment>
        )
    }
}