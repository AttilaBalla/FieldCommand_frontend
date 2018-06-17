import React from "react";
import {UserRoleElement, userRoles} from "./UserRoleElement"
import {updateUser} from "../../../util/APIUtils";
import {alertTypes} from "../../../util/Alert";
import {UserContext} from "../../../util/UserProvider";
import {UserCardForm} from "./UserCardForm";
import {UserCardHeader} from "./UserCardHeader";

export class UserCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            index: props.index,
            id: props.id,
            username: props.name,
            email: props.email,
            role: props.role,
            rolePower: props.rolePower,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();

        updateUser(this.state)
            .then(() => {
                this.props.sendAlert({
                    alertType: alertTypes.SUCCESS,
                    message: "Your changes have been saved successfully!"
                });

            }).catch(error => {
                this.props.sendAlert({
                    alertType: alertTypes.ERROR,
                    message: error.information
                });
            })
    }

    render() {

        let rolePanel = null;
        if (this.props.role === "ROLE_OWNER") {
            rolePanel = <p className="text-secondary">
                            <i className="fa fa-ban mr-2" aria-hidden="true"></i>
                            cannot be changed for this user!
                        </p>
        } else {
            rolePanel = userRoles.map((role, key) => {
                return (
                    <UserRoleElement
                        key={key}
                        role={role.roleName}
                        checked={(this.state.role === role.roleName)}
                        badgeColor={role.badgeColor}
                        displayName={role.displayName}
                        handleChange={this.handleChange}
                    />
                )
            });
        }

        return (
            <UserContext.Consumer>
                {value => {
                    const {user} = value;
                    let editable = true;

                    if(user.id !== parseInt(this.state.id, 10) && user.rolePower <= this.state.rolePower) {
                        editable = false;
                    }

                    return(
                        <div className="card">
                            <UserCardHeader
                                editable={editable}
                                index={this.state.index}
                                role={this.state.role}
                                username={this.state.username}
                            />
                            <div className="collapse" id={"collapse" + this.state.index} data-parent="#accordion">
                                {(editable)
                                    ? <UserCardForm
                                        submit={this.handleSubmit}
                                        change={this.handleChange}
                                        username={this.state.username}
                                        email={this.state.email}
                                        rolepanel={rolePanel}
                                        />
                                    : null}
                            </div>
                        </div>
                    )
                }}
            </UserContext.Consumer>
        )
    }
}