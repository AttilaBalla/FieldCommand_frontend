import React from "react";
import {UserRoleElement, userRoles} from "./UserRoleElement"
import {updateUser} from "../../../util/APIUtils";
import {alertTypes} from "../../../util/Alert";
import {UserContext} from "../../../util/UserProvider";
import {UserCardForm} from "./UserCardForm";
import {UserCardHeader} from "./UserCardHeader";
import {projectBadges} from "../../../util/ProjectBadge";
import {UserProjectsElement} from "./UserProjectsElement";

export class UserCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            index: props.index,
            id: props.id,
            username: props.name,
            email: props.email,
            role: props.role,
            projects: props.projects,
            rolePower: props.rolePower,
        };

        this.selectedProjects = new Set();

        if(props.projects.length > 0) {
            props.projects.forEach(element => {
                this.selectedProjects.add(element);
            })
        }

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        this.rolesPanel = this.makeRolesPanel();
        this.projectsPanel = this.makeProjectsPanel();
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleCheckboxChange(event) {
        if (this.selectedProjects.has(event.target.value)) {
            this.selectedProjects.delete(event.target.value);
        } else {
            this.selectedProjects.add(event.target.value);
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        if(this.state.username === "" || this.state.email === "") {
            this.props.sendAlert({
                alertType: alertTypes.ERROR,
                message: "The input fields cannot be empty!"
            });
        } else {

            let formData = this.state;

            formData["projects"] = Array.from(this.selectedProjects);

            updateUser(formData)
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
    }

    makeProjectsPanel() {
        let projectList = Object.keys(projectBadges).map(i => projectBadges[i]);

        return projectList.map((project, key) => {
            return (
                <UserProjectsElement
                    key={key}
                    shortname={project.projectShortName}
                    toggleCheckbox={this.handleCheckboxChange}
                    checked={this.selectedProjects.has(project.projectShortName)}
                />
            )
        });
    }

    makeRolesPanel() {
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

        return rolePanel;
    }

    render() {

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
                                        toggleCheckbox={this.handleCheckboxChange}
                                        username={this.state.username}
                                        email={this.state.email}
                                        rolepanel={this.rolesPanel}
                                        projectpanel={this.projectsPanel}
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