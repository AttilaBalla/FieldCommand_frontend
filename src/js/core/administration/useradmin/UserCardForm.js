import React from "react";
import {UserCardIcon} from "./UserCardIcon";

export class UserCardForm extends React.Component {

    checkForIconConditions() {

        this.icons = [];

        if(!this.props.activated) {
            this.icons.push(
                {
                    icon: "fa fa-power-off",
                    description: "This account has no password currently."
                }
            )
        }

        if(this.props.role === "ROLE_NEW") {
            this.icons.push(
                {
                    icon: "fa fa-plug",
                    description: "This account does not have a role. You can set one now, or it will be automatically set to User upon activation."
                }
            )
        }
    }

    render() {

        this.checkForIconConditions();

        let disabled = (this.props.buttonsDisabled) ? "disabled" : null;

        return (
            <React.Fragment>
                <div className="card-body">
                    {(this.icons.length > 0)
                        ?
                        <div className="usercard_icons">
                            {this.icons.map((item, key) => {
                                return <UserCardIcon
                                    key={key}
                                    iconClass={item.icon}
                                    description={item.description}
                                />
                            }
                            )}
                        </div>
                        : null
                    }
                    <form className="user_edit d-inline-block" onSubmit={this.props.submit}>
                        <div className="float-left user_details">
                            <label htmlFor="username">Username</label>
                            <input type="text"
                                   name="username"
                                   className="form-control user_username"
                                   onChange={this.props.change}
                                   defaultValue={this.props.username}/>
                            <label htmlFor="email" className="mt-3">E-mail address</label>
                            <input type="text"
                                   name="email"
                                   className="form-control user_email"
                                   onChange={this.props.change}
                                   defaultValue={this.props.email}/>
                        </div>
                        <div className="float-right mt-2 user_permissionPanel">
                            <h6>Role</h6>
                            {this.props.rolepanel}
                        </div>
                        <div className="float-right mt-2 user_permissionPanel">
                            <h6> Projects </h6>
                            {this.props.projectpanel}
                        </div>
                        <div className="float-right w-100">
                            <button className={"btn btn-primary user_update_button float-right mb-3 " + disabled}
                                    type="submit">
                                <i className="fa fa-floppy-o mr-2" aria-hidden="true"></i>Save changes
                            </button>
                        </div>
                    </form>
                </div>
                <div className = "card-footer text-muted" >
                    <button className="btn btn-warning" onClick={this.props.resetActivation}>
                        Reset Activation
                    </button>
                </div>
            </React.Fragment>
        )
    }
}