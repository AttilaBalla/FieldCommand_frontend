import React from "react";

export class UserCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            key: props.key,
            id: props.id,
            name: props.name,
            email: props.email,
            role: props.role
        }
    }

    render() {

        console.log(this.state);

        return (
            <div className="card">
                <div className="card-header collapsed" data-toggle="collapse" data-target={"#collapse" + this.state.key}>
                    <h6 className="mb-0 text-danger">XAttus</h6>
                </div>
                <div className="collapse" id={"collapse" + this.state.key} data-parent="#accordion">
                    <div className="card-body">
                        <form className="user_edit">
                            <div className="float-left user_details">
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" className="form-control user_username" value=""/>

                                <label htmlFor="email" className="mt-3">E-mail address</label>
                                <input type="text" name="email" className="form-control user_email"
                                       value=""/>
                                <input type="hidden" name="id" value=""/>
                            </div>
                            <div className="float-right mt-2 user_roles">
                                <h6>Roles</h6>
                                <input type="radio" name="role" value="ROLE_ADMIN"/>
                                <span className="badge badge-danger ml-2">Admin</span>
                                <input type="radio" name="role" value="ROLE_DEVELOPER"/>
                                <span className="badge badge-warning ml-2">Developer</span>
                                <input type="radio" name="role" value="ROLE_USER"/>
                                <span className="badge badge-primary ml-2">User</span>
                                <input type="radio" name="role" value="ROLE_DISABLED"/>
                                <span className="badge badge-dark ml-2">Disabled</span>
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