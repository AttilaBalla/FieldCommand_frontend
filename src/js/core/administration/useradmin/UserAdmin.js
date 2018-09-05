import React from "react";
import {UserInvite} from "./UserInvite";
import {UserEdit} from "./UserEdit";
import {Alert} from "../../../util/Alert.js";

export class UserAdmin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            listNeedsUpdate: false,
            alertType: null
        };

        this.setAlert = this.setAlert.bind(this);
        this.setUpdate = this.setUpdate.bind(this);
    }

    setAlert(alert) {
        this.setState({
            alertType: alert.alertType,
            messages: alert.messages,
        })
    }

    setUpdate(update) {
        this.setState({
            listNeedsUpdate: update
        })
    }

    render() {

        let alert = (this.state.alertType)
            ? <Alert alertType={this.state.alertType} messages={this.state.messages}/>
            : null;

        return (
            <React.Fragment>
                {alert}
                <UserInvite sendUpdate={this.setUpdate} sendAlert={this.setAlert}/>
                <UserEdit update={this.state.listNeedsUpdate} sendAlert={this.setAlert}/>
            </React.Fragment>
        )
    }
}