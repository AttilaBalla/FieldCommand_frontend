import React from "react";
import {getCurrentUser} from "./APIUtils";
import {ACCESS_TOKEN} from "../Constants";

export const UserContext = React.createContext();
export class Provider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            notFound: false,
            serverError: false
        };

        this.logout = this.logout.bind(this);
    }

    logout() {
        localStorage.removeItem(ACCESS_TOKEN);
        this.setState({username: null});
    }

    loadUser() {

        if (localStorage.getItem(ACCESS_TOKEN)) {
            console.log("retriving user info...");
            getCurrentUser()
                .then(response => {
                    console.log(response);
                    this.setState({
                        username: response["username"],
                        // put more user related stuff in here later as needed
                    });
                }).catch(error => {
                if (error.status === 404) {
                    this.setState({
                        notFound: true,
                    });
                } else {
                    this.setState({
                        serverError: true,
                    });
                }
            });
        } else {
            //TODO error handling
            console.log("no access token set!");
        }

    }


    componentWillMount() {
        this.loadUser();
    }

    render() {

        return(
            <UserContext.Provider value={
                {
                    username:this.state.username, // expose data to other components
                    logout: this.logout,
                }
            }>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}