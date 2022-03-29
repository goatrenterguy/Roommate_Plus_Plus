import '../../App.css';
import Logo from '../../logo.svg';
import './PrimaryTopNav.css';
import NavLinkBar from './NavLinkBar';
import IsUserSignedIn from "../Login/IsUserSignedIn";
import SignOutButton from '../Login/SignOutButton'
import React from 'react';
import SignInSignUpModalButton from '../Login/SignInSignUpModalButton';

class PrimaryTopNav extends React.Component {
    render() {
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
                        <NavLinkBar/>
                        <IsUserSignedIn>
                            <SignOutButton/>
                        </IsUserSignedIn>
                        <IsUserSignedIn isFlipped>
                            <SignInSignUpModalButton/>
                        </IsUserSignedIn>
                    </div>
                </div>
            </nav>
        );
    }
}

export default PrimaryTopNav;