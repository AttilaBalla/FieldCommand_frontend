import React from "react";
import '../../css/login.css';
import { login } from './APIUtils';

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

export class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "", password: "", inputError: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        login({"username": this.state.username, "password": this.state.password})
            .then(response => {
                localStorage.setItem("ACCESS_TOKEN", response.accessToken);
                console.log("logged in!");

            }).catch(error => {
                if(error.status === 401) {
                    this.setState({inputError: true});

                    setTimeout(() => {
                        this.setState({
                            inputError: false
                        })
                    }, 2000);

                } else {
                    console.log("internal error!");
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
                    <h5>FIELDCOMMAND LOGIN</h5>
                    <LoginInput error={this.state.inputError}>
                        <label>
                            <span className="fa fa-user" aria-hidden="true"/>
                            <input className="login_field" type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username" required="true" />
                        </label>
                    </LoginInput>
                    <LoginInput error={this.state.inputError}>
                        <label>
                            <span className="fa fa-lock" aria-hidden="true"/>
                            <input className="login_field" type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" required="true" />
                        </label>
                    </LoginInput>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
                </form>
            </div>
        )

    }
}
