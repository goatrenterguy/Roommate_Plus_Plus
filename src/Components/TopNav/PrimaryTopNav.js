import '../../App.css';
import './PrimaryTopNav.css';
import NavLinkBar from './NavLinkBar';
import SignOutButton from '../Login/SignOutButton'
import React from 'react';
import {Link} from "react-router-dom";
import SignInSignUpModalButton from '../Login/SignInSignUpModalButton';
import {userContext} from "../../Contexts/userContext";

function PrimaryTopNav() {
    const user = React.useContext(userContext).user;
    return (
        <nav className="navbar navbar-expand-sm bg-light navbar-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src="/Images/Logo.png" className="navbar-brand-logo" alt="Logo"/>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <NavLinkBar/>
                    {user ? <SignOutButton/> : <SignInSignUpModalButton/>}
                </div>
            </div>
        </nav>
    );
}

export default PrimaryTopNav;