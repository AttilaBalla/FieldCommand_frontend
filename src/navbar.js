import { SwrNet } from './swrnet.js';

function UsernamePanel(props) {
    return(
        <div class="dropdown show mr-2">
            <a class="dropdown-toggle" href="#" role="button" id="user_actions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="mr-1 username">{props.username}</span>
            </a>
            <div class="dropdown-menu" aria-labelledby="user_actions">
                <a class="dropdown-item" href="/logout"><span><i class="fa fa-sign-out"></i></span>Log out</a>
            </div>
        </div>
    )
}

function NavbarLinks(props) {

    return (
    <ul className="navbar-nav main_navbar">
        <li className="nav-item">
            <a className="nav-link" href="#"><i className="fa fa-bars"></i>News</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/about"><i className="fa fa-info"></i> About</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/releases"><i className="fa fa-download"></i> Releases</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="#"><i className="fa fa-clipboard"></i> Game Reports</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/admin"><i className="fa fa-cog"></i>Administration</a>
        </li>
    </ul>)
}

class Navbar extends React.Component {
    
    constructor(props) {
		super(props);
		this.state = {};
    }

    render() {
        const navbar = <nav className="navbar navbar-expand-sm">
                            <a className = "navbar-brand" href="/"><img src="/img/fc_icon.png" width="55" height="55" alt="logo"/></a>
                            <NavbarLinks/>
                            <UsernamePanel/>
                            <SwrNet/>
                       </nav>
    }
}

ReactDOM.render(<Navbar/>, document.getElementById("navbar_content"));