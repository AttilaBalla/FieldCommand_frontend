import React from "react";
import '../../css/login.css';
import {activateUser} from './APIUtils';
import {ServerErrorIndicator} from "./ServerErrorIndicator";
import {PW_LENGTH} from "./Constants";

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
            key: null,
            difference: true,
            password: "",
            passwordAgain: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { match: { params } } = this.props; // pull params out of the URL via match obj
        this.setState({key: params.id})
    }

    handleSubmit(event) {
        event.preventDefault();

        activateUser({"key": this.state.key, "password": this.state.password})
            .then(response => {
                window.location.replace(window.location["origin"]);

            }).catch(error => {
                // TODO ERROR HANDLING
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

        if(this.state.password.length <= PW_LENGTH) {
            short = true;
        }

        return (
            <div className="login_container">
                <form onSubmit={this.handleSubmit}>
                    <img src="/img/fc.png" width="200" height="200" alt=""/>
                    <h5>
                        SET YOUR PASSWORD
                        <ServerErrorIndicator error={this.state.loginStatus}/>
                    </h5>
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
                        disabled={(different) ? "disabled" : "" || (short) ? "disabled" : ""}>
                        {(different) ? "doesn't match!" : "" || (short) ? "too short... < " + PW_LENGTH : "Continue"}
                    </button>
                </form>
            </div>
        )
    }
}