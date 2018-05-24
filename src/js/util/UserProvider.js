import React from "react";
import {getCurrentUser} from "./APIUtils";

export const UserContext = React.createContext();
export class Provider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            notFound: false,
            serverError: false
        };

        //this.loadUser = this.loadUser.bind(this);
    }

    loadUser() {
        console.log("attempting to load user...");
        getCurrentUser()
            .then(response => {
                this.setState({
                    user: response,
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
                    user: this.state.user, // expose state to other components like this
                }
            }>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}