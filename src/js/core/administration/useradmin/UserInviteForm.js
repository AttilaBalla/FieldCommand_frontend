import React from "react";
import {sendEmailInvite} from "../../../util/APIUtils";
import {alertTypes} from "../../../util/Alert";

export class UserInviteForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            status: "",
            success: "",
            result: "",
            username: "",
            email: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({status: "pending"});
        this.props.sendAlert({
            alertType: alertTypes.NEUTRAL,
            message: "Sending, please wait..."
        });

        console.log(this.state.email + " " + this.state.username);
        sendEmailInvite({"username":this.state.username, "email": this.state.email})
            .then(response => {

                if(response["success"]) {
                    this.props.sendAlert({
                        alertType: alertTypes.SUCCESS,
                        message: "The email has been sent successfully!"
                    });
                } else {
                    this.props.sendAlert({
                        alertType: alertTypes.ERROR,
                        message: response["information"]
                    });
                }

                this.setState({
                    status: "done",
                    success: response["success"],
                    result: response["information"],
                });

            }).catch(error => {
            if(error.status === 401) {
                this.setState({status: "unauthorized"});

            } else {
                this.setState({status: "serverError"})
            }
        })
    }

    render() {

        return(
            <form className="form_block userinvite_form" onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="username" className="sr-only">Username</label>
                    <input type="text" name="username" className="form-control" onChange={this.handleChange} placeholder="Username"
                           required="true"/>
                </div>
                <div>
                    <label htmlFor="email" className="sr-only">E-mail adress</label>
                    <input type="text" name="email" className="form-control" onChange={this.handleChange} placeholder="E-mail address"
                           required="true"/>
                </div>
                <button
                    className="btn btn-primary invite_send_button"
                    disabled={(this.state.status === "pending") ? "disabled" : ""}
                    type="submit">Send invitation
                </button>
            </form>
        )
    }

}