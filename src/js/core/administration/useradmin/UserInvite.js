import React from "react";
import {UserInviteForm} from "./UserInviteForm";

export class UserInvite extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {

        return(
            <section className="useradmin_invite">
                <h5>User account creation<br/>
                    <small>Adding new users is invite-based. This form will send an e-mail with further instructions.
                    </small>
                </h5>
                <UserInviteForm sendAlert={this.props.sendAlert}/>
            </section>
        )
    }
}