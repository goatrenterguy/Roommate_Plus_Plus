import '../App.css';
import Logo from '../logo.svg';
import './PrimaryTopNav.css';
import SignInModalButton from '../Login/SignInModalButton';

function PrimaryTopNav() {
    return (
        <nav className="navbar navbar-expand-sm bg-light navbar-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src={Logo} className="navbar-brand-logo" alt="Logo"/>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                    </ul>
                    <SignInModalButton/>
                </div>
            </div>
        </nav>
        );
}

export default PrimaryTopNav;