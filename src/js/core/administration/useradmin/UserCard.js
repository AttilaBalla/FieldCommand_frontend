import React from "react";
import {UserRoleElement, userRoles} from "./UserRoleElement"
import {sendEmailInvite} from "../../../util/APIUtils";

export class UserCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            index: props.index,
            id: props.id,
            name: props.name,
            email: props.email,
            role: props.role
        }
    }

    setNameColor(role) {

        let nameColor = "text-dark";

        switch(role) {

            case "ROLE_ADMIN":
                nameColor = "text-danger";
                break;

            case "ROLE_DEVELOPER":
                nameColor = "text-warning";
                break;

            case "ROLE_USER":
                nameColor = "text-primary";
                break;

            case "ROLE_NEW":
                nameColor = "text-info";
                break;

            case "ROLE_DISABLED":
                nameColor = "text-dark";
                break;
            default:
                break;

        }

        return nameColor;

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

        let roleElements = userRoles.map((role, key) => {
            return (
                <UserRoleElement
                    key = {key}
                    role = {role.roleName}
                    checked = {(this.state.role === role.roleName)}
                    badgeColor = {role.badgeColor}
                    displayName = {role.displayName}
                />
            )
        });

        return (
            <div className="card">
                <div className="card-header collapsed" data-toggle="collapse" data-target={"#collapse" + this.state.index}>
                    <h6 className={"mb-0 " + this.setNameColor(this.state.role)} >{this.state.name}</h6>
                </div>
                <div className="collapse" id={"collapse" + this.state.index} data-parent="#accordion">
                    <div className="card-body">
                        <form className="user_edit" onSubmit={this.handleSubmit}>
                            <div className="float-left user_details">
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" className="form-control user_username" defaultValue={this.state.name}/>
                                <label htmlFor="email" className="mt-3">E-mail address</label>
                                <input type="text" name="email" className="form-control user_email" defaultValue={this.state.email}/>
                            </div>
                            <div className="float-right mt-2 user_roles">
                                <h6>Roles</h6>
                                {roleElements}
                            </div>
                            <div className="float-right mt-2 user_versions">
                                <h6> Versions </h6>
                                <input type="checkbox" name="versions" value="Official"/>
                                <span className="badge badge_version ml-2">Official</span>
                                <input type="checkbox" name="versions" value="BP 1.5"/>
                                <span className="badge badge_version ml-2">BP 1.5</span>
                            </div>
                            <div className="float-right w-100">
                                <button className="btn btn-warning user_update_button float-right mb-3" type="submit">
                                    Save changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}