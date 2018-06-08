import React from "react";
import {UserCard} from "./UserCard";
import {getAllUsers} from "../../../util/APIUtils";

export class UserEdit extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.update) {
            this.getUserData();
        }
    }

    componentDidMount() {
        this.getUserData();
    }

    getUserData() {
        getAllUsers()
            .then(response => {
                this.setState({users: response})
            })
    }

    render() {

        return(
            <section className="useradmin_userlist">
                <div id="accordion" className="user_cards">
                    {this.state.users.map((user, key) => {
                        return (
                            <UserCard
                                key={key}
                                index={key}
                                id={user.id}
                                name={user.username}
                                email={user.email}
                                role={user.role}
                                sendAlert={this.props.sendAlert}
                            />
                        )
                    })}
                </div>
            </section>
        )
    }

}