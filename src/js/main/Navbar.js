import { Swrnet } from '../util/Swrnet.js';
import React from "react";
import { Link } from 'react-router-dom';
import '../../css/navbar.css';
import {UserContext} from "../util/UserProvider";

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

    const adminLink = (props.username ) ?
    <li className="nav-item">
        <Link className="nav-link" to="/administration"> <i className="fa fa-cog"></i>Adminsitration</Link>
    </li> : "";

    return (
    <ul className="navbar-nav main_navbar">
        <li className="nav-item">
            <Link className="nav-link" to="/"> <i className="fa fa-bars"></i>News</Link>
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
        {adminLink}
    </ul>)
}

export class Navbar extends React.Component {
    
    constructor(props) {
		super(props);
		this.state = {};
    }

    render() {

        return(
            <UserContext.Consumer>
                {value => {
                    //console.log(value.user);
                    const {user, logout} = value;

                    let userName = (user) ? user.username : "";
                    let userPanel = (userName) ? <UsernamePanel username={userName} logout={logout}/> : "";

                    return(
                    <div id="navbar_bg">
                        <nav className="navbar navbar-expand-sm">
                            <Link className = "navbar-brand" to="/"><img src="/img/fc_icon.png" width="55" height="55" alt="logo"/></Link>
                            <NavbarLinks username={userName}/>
                            <div className="navbar-nav ml-auto navbar_right">
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
