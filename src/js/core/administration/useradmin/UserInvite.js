import React from "react";
import {sendEmailInvite} from "../../../util/APIUtils";
import {Alert, alertTypes} from "../../../util/Alert";

export class UserInvite extends React.Component {

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

        console.log(this.state.email + " " + this.state.username);
        sendEmailInvite({"username":this.state.username, "email": this.state.email})
            .then(response => {

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

        let alert = "";

        if(this.state.status === "pending") {
            alert = <Alert alertType={alertTypes.NEUTRAL} text="Sending, please wait..."/>
        } else if (this.state.status === "done") {
            alert = (this.state.success) ?
                <Alert alertType={alertTypes.SUCCESS} text="The e-mail has been sent successfully!"/> :
                <Alert alertType={alertTypes.ERROR} text={this.state.result}/>
        }

        return(
            <section className="useradmin_invite">
                {alert}
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
                    <button className="btn btn-primary invite_send_button" type="submit">Send invitation</button>
                </form>
            </section>
        )
    }

}