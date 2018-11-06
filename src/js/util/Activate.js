import React from "react";
import '../../css/login.css';
import {activateUser, validateActivationKey} from './APIUtils';
import {ErrorTooltip} from "./ErrorTooltip";
import {PW_LENGTH} from "./Constants";
import {StatusMessage} from "./StatusMessage";
import {messages} from "./Messages";

function LoginInput(props) {

    const componentClasses = ["input_field"];

    if(props.error) {
        componentClasses.push("input_field_error")
    }

    return(
        <div className={componentClasses.join(" ")}>
            {props.children}
        </div>
    )
}

export class Activate extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            key: null,
            difference: true,
            password: "",
            passwordAgain: "",
            errorMessage: "",
            pending: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const {match: {params}} = this.props; // pull params out of the URL via match obj

        validateActivationKey(params.id)
            .then(response => {

                console.log(response);

                this.setState({
                    key: params.id,
                    username: response.information,
                });

            }).catch(() => {
                this.setState({
                    errorMessage: "serverError",
                })
        })

    }
    handleSubmit(event) {
        event.preventDefault();
        this.setState({pending: true});

        activateUser({
            "key": this.state.key,
            "password": this.state.password,
            "username": this.state.username
            })
            .then(() => {

                window.location.replace(window.location["origin"]);

            }).catch(error => {

                this.setState({
                    errorMessage: error.information,
                    pending: false
                })
            })
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        let short = false;
        let different = false;

        if(this.state.password !== this.state.passwordAgain) {
            different = true;
        }

        if(this.state.password.length < PW_LENGTH) {
            short = true;
        }

        return (
            <div className="login_container">
                <form onSubmit={this.handleSubmit}>
                    <img src="/img/fc.png" width="200" height="200" alt=""/>
                    <h5>
                        SET YOUR USERNAME & PASSWORD
                        <ErrorTooltip error={this.state.errorMessage}/>
                    </h5>
                    <div className="w-90 m-auto">
                        <StatusMessage type="info" message={messages.info_username}/>
                    </div>
                    <div className="input_field">
                        <label>
                            <span className="fa fa-user" aria-hidden="true"/>
                            <input
                                className="login_field"
                                type="text"
                                name="username"
                                onChange={this.handleChange}
                                placeholder="Username"
                                value={this.state.username}
                                required="true" />
                        </label>
                    </div>
                    <LoginInput error={different}>
                        <label>
                            <span className="fa fa-lock" aria-hidden="true"/>
                            <input className="login_field" type="password" name="password" onChange={this.handleChange} placeholder="Password" required="true" />
                        </label>
                    </LoginInput>
                    <LoginInput error={different}>
                        <label>
                            <span className="fa fa-repeat" aria-hidden="true"/>
                            <input className="login_field" type="password" name="passwordAgain" onChange={this.handleChange} placeholder="Password again" required="true" />
                        </label>
                    </LoginInput>
                    <button
                        className="btn btn-lg btn-primary btn-block"
                        type="submit"
                        disabled={
                            (different) ? "disabled" : "" ||
                            (short) ? "disabled" : "" ||
                            (this.state.pending) ? "disabled" : "" ||
                            (this.state.username) ? "" : "disabled"
                        }>
                        {(different) ? "doesn't match!" : "" ||
                        (short) ? "too short... < " + PW_LENGTH : "Continue"}
                    </button>
                </form>
            </div>
        )
    }
}
