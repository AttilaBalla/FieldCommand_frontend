import {Swrnet} from '../util/Swrnet.js';
import React from "react";
import {Link} from 'react-router-dom';
import '../../css/navbar.css';
import {UserContext} from "../util/UserProvider";
import {StatusMessage} from "../util/StatusMessage";

function UsernamePanel(props) {

    return(
        <div className="dropdown show mr-5">
            <a className="dropdown-toggle" href="" role="button" id="user_actions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="mr-1 username">{props.username}</span>
            </a>
            <div className="dropdown-menu" aria-labelledby="user_actions">
                <div className="dropdown-item logout_button" onClick={props.logout}><span><i className="fa fa-sign-out"></i></span>Log out</div>
            </div>
        </div>
    )
}

function NavbarLinks(props) {

    const adminLink = (props.user !== null && props.user.rolePower >= 20)
        ?
            <li className="nav-item">
                <Link className="nav-link" to="/administration/"> <i className="fa fa-cog"></i>Administration</Link>
            </li>
        : "";

    const intRequestLink = (props.user)
        ?
        <li className="nav-item">
            <Link className="nav-link" to="/requests"><i className="fa fa-comment"></i>Internal Requests</Link>
        </li>
        : "";

    return (
    <ul className="navbar-nav main_navbar">
        <li className="nav-item">
            <Link className="nav-link" to="/news"> <i className="fa fa-bars"></i>News</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/about"><i className="fa fa-info"></i>About</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/"><i className="fa fa-download"></i>Releases</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/"><i className="fa fa-clipboard"></i>Game Reports</Link>
        </li>
        {intRequestLink}
        {adminLink}
    </ul>)
}

export class Navbar extends React.Component {
    
    constructor(props) {
		super(props);
		this.state = {};
    }

    handleClick() {
        //console.log("something here"); TODO mobile view menu closing upon tapping a link
    }

    render() {

        return(
            <UserContext.Consumer>
                {value => {
                    let {user, logout, error} = value;
                    let userPanel, userName = null;

                    if(error != null) {
                        user = null;
                        switch(error) {
                            case "expiredToken":
                                userPanel = <StatusMessage type="info" message={error}/>;
                                break;
                            default:
                                userPanel = <StatusMessage type="error" message={error}/>;
                                break;
                        }
                    } else {
                        userName = (user) ? user.username : "";
                        userPanel = (userName) ? <UsernamePanel username={userName} logout={logout}/> : "";
                    }

                    return(
                    <div id="navbar_bg">
                        <nav className="navbar navbar-expand-md">
                            <Link className = "navbar-brand" to="/"><img src="/img/fc_icon.png" width="55" height="55" alt="logo"/></Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <i className="fa fa-chevron-down text-primary" aria-hidden="true"></i>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent" onClick={this.handleClick}>
                                <NavbarLinks user={user}/>
                            </div>
                            <div className="navbar_right">
                                {userPanel}
                                <Swrnet/>
                            </div>
                        </nav>
                    </div>
                    )
                }}
            </UserContext.Consumer>
        )
    }
}
