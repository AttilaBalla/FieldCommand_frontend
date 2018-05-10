import { Swrnet } from './Swrnet.js';
import React from "react";
import { Link } from 'react-router-dom';
import '../css/navbar.css';

function UsernamePanel(props) {
    return(
        <div className="navbar-nav ml-auto navbar_right">
        <div className="dropdown show mr-5">
            <a className="dropdown-toggle" href="#" role="button" id="user_actions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="mr-1 username">{props.username}</span>
            </a>
            <div className="dropdown-menu" aria-labelledby="user_actions">
                <a className="dropdown-item" href="#"><span><i className="fa fa-sign-out"></i></span>Log out</a>
            </div>
        </div>
        </div>
    )
}

function NavbarLinks() {

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
        <li className="nav-item">
            <Link className="nav-link" to="/"> <i className="fa fa-cog"></i>Adminsitration</Link>
        </li>
    </ul>)
}

export class Navbar extends React.Component {
    
    constructor(props) {
		super(props);
		this.state = {};
    }

    render() {
        return(
            <div id="navbar_bg">
                <nav className="navbar navbar-expand-sm">
                    <a className = "navbar-brand" href="/"><img src="/img/fc_icon.png" width="55" height="55" alt="logo"/></a>
                    <NavbarLinks/>
                    <UsernamePanel username="XAttus"/>
                    <Swrnet/>
                </nav>
            </div>
        )
    }
}
