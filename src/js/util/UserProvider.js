import React from "react";
import {getCurrentUser} from "./APIUtils";
import {ACCESS_TOKEN} from "./Constants";

export const UserContext = React.createContext();
export class UserProvider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            error: null,
        };

        this.logout = this.logout.bind(this);
    }

    logout() {
        localStorage.removeItem(ACCESS_TOKEN);
        this.setState({user: null});
    }

    loadUser() {

        if (localStorage.getItem(ACCESS_TOKEN)) {
            getCurrentUser()
                .then(response => {
                    this.setState({
                        user: response,
                    });
                }).catch(error => {
                if (error.status === 401) {
                    localStorage.removeItem(ACCESS_TOKEN);
                    this.setState({error: "expiredToken"});
                } else {
                    this.setState({error: "serverError"});
                }
            });
        } else {
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
                    user: this.state.user, // expose data to other components
                    logout: this.logout,
                    error: this.state.error
                }
            }>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}