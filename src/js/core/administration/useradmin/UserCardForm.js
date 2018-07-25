import React from "react";

export function UserCardForm(props) {

    let disabled = (props.buttonsDisabled) ? "disabled" : null;

    return(
        <div className="card-body">
            <form className="user_edit" onSubmit={props.submit}>
                <div className="float-left user_details">
                    <label htmlFor="username">Username</label>
                    <input type="text"
                           name="username"
                           className="form-control user_username"
                           onChange={props.change}
                           defaultValue={props.username}/>
                    <label htmlFor="email" className="mt-3">E-mail address</label>
                    <input type="text"
                           name="email"
                           className="form-control user_email"
                           onChange={props.change}
                           defaultValue={props.email}/>
                </div>
                <div className="float-right mt-2 user_permissionPanel">
                    <h6>Role</h6>
                    {props.rolepanel}
                </div>
                <div className="float-right mt-2 user_permissionPanel">
                    <h6> Projects </h6>
                    {props.projectpanel}
                </div>
                <div className="float-right w-100">
                    <button className={"btn btn-primary user_update_button float-right mb-3 " + disabled} type="submit">
                        <i className="fa fa-floppy-o mr-2" aria-hidden="true"></i>Save changes
                    </button>
                </div>
            </form>
        </div>
    )
}