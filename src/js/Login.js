import React from "react";
import '../css/login.css';

export class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {username: "", password: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
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
                    <div className="input_field">
                        <label>
                            <span className="fa fa-user" aria-hidden="true"/>
                            <input type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username" required="true" />
                        </label>
                    </div>
                    <div className="input_field">
                        <label>
                            <span className="fa fa-lock" aria-hidden="true"/>
                            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" required="true" />
                        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
                </form>
            </div>
        )

    }
}
