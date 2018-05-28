import React from "react";
import {UserInvite} from "./UserInvite";
import {UserEdit} from "./UserEdit";

export class UserAdmin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {

        return (
            <React.Fragment>
                <UserInvite/>
                <UserEdit/>
            </React.Fragment>
        )
    }
}