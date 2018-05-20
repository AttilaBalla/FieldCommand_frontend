import React from "react";

const UserContext = React.createContext();
export class Provider extends React.Component {

    state = {
        user: null
    };

    render() {
        return(
            <UserContext.Provider>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}