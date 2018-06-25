import React from "react";
import '../../css/login.css';
import {login} from './APIUtils';
import {ErrorIndicator} from "./ErrorIndicator";
import {ACCESS_TOKEN} from "./Constants";

function LoginInput(props) {

    const componentClasses = ["input_field"];

    if(props.error === "unauthorized") {
        componentClasses.push("input_field_error")
    }

    return(
        <div className={componentClasses.join(" ")}>
            {props.children}
        </div>
    )
}

export class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            loginStatus: false,
            pending: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({pending: true});

        login({"username": this.state.username, "password": this.state.password})
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                console.log("logged in!");
                window.location.replace(window.location["origin"]);

            }).catch(error => {
                console.log(error);
                if (error.status === 401) {
                    this.setState({
                        loginStatus: "unauthorized",
                        pending: false
                    });

                setTimeout(() => {
                    this.setState({loginStatus: ""})
                }, 2000);

                } else {
                    this.setState({
                        loginStatus: "serverError",
                        pending: false
                    })
                }
            })

    }


    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    render() {

        return (
            <div className="login_container">
                <form onSubmit={this.handleSubmit}>
                    <img src="/img/fc.png" width="200" height="200" alt=""/>
                    <h5>
                        FIELDCOMMAND LOGIN
                        {(this.state.loginStatus === "serverError")
                            ? <ErrorIndicator error={(this.state.loginStatus)}/>
                            : null
                        }
                    </h5>
                    <LoginInput error={this.state.loginStatus}>
                        <label>
                            <span className="fa fa-user" aria-hidden="true"/>
                            <input className="login_field" type="text" name="username" onChange={this.handleChange} placeholder="Username" required="true" />
                        </label>
                    </LoginInput>
                    <LoginInput error={this.state.loginStatus}>
                        <label>
                            <span className="fa fa-lock" aria-hidden="true"/>
                            <input className="login_field" type="password" name="password" onChange={this.handleChange} placeholder="Password" required="true" />
                        </label>
                    </LoginInput>
                    <button className="btn btn-lg btn-primary btn-block"
                            type="submit"
                            disabled={(this.state.pending) ? "disabled" : ""}>
                        {(this.state.pending) ? "Please wait..." : "Login"}</button>
                </form>
            </div>
        )

    }
}
