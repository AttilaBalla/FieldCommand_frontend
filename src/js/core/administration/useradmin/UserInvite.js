import React from "react";
import {alertTypes} from "../../../util/Alert";
import {sendEmailInvite} from "../../../util/APIUtils";

export class UserInvite extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pending: false,
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

        this.setState({pending: true});
        this.props.sendAlert({
            alertType: alertTypes.NEUTRAL,
            messages: ["Sending, please wait..."]
        });

        sendEmailInvite({"username":this.state.username, "email": this.state.email})
            .then(response => {

                if(response["success"]) {
                    this.props.sendAlert({
                        alertType: alertTypes.SUCCESS,
                        messages: ["The email has been sent successfully!"]
                    });

                    this.props.sendUpdate(true);

                } else {
                    this.props.sendAlert({
                        alertType: alertTypes.ERROR,
                        messages: [response.information]
                    });
                }

                this.setState({
                    pending: false,
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
            <section className="useradmin_invite">
                <h5>User account creation<br/>
                    <small>Adding new users is invite-based. This form will send an e-mail with further instructions.
                    </small>
                </h5>
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
                        disabled={(this.state.pending) ? "disabled" : ""}
                        type="submit">Send invitation
                    </button>
                </form>
            </section>
        )
    }
}