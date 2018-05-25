import React from "react";
import {getCurrentUser} from "./APIUtils";

export const UserContext = React.createContext();
export class Provider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            notFound: false,
            serverError: false
        };
    }

    loadUser() {
        console.log("attempting to load user...");
        getCurrentUser()
            .then(response => {
                this.setState({
                    username: response["username"],
                    // put more user related stuff in here later as needed
                });
            }).catch(error => {
            if(error.status === 404) {
                this.setState({
                    notFound: true,
                });
            } else {
                this.setState({
                    serverError: true,
                });
            }
        });
    }

    componentWillMount() {
        this.loadUser();
    }

    render() {
        return(
            <UserContext.Provider value={
                {
                    username:this.state.username, // expose data to other components
                }
            }>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}