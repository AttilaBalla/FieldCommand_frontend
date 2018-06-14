import React from "react";

export function UserCardForm(props) {

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
                <div className="float-right mt-2 user_roles">
                    <h6>Role</h6>
                    {props.rolepanel}
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
    )
}