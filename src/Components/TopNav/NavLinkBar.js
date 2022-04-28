import NavLink from './NavLink'
import React, {useState} from 'react'
import getNavLinks from "../DataObjects/getNavLinkData";
import {userContext} from "../../Contexts/userContext";

function NavLinkBar() {
    const [links] = useState(getNavLinks);
    const user = React.useContext(userContext).user;

    function getLinks() {
        let navLinkDoms = [];
        function getLinkDoms(value, index) {
            if ((value.loggedIn === true && user) || (value.loggedIn === false && !user) || (value.loggedIn === undefined)) {
                navLinkDoms.push(<NavLink key={"navLink" + index} text={value.text} href={value.href}/>);
            }
        }
        links.forEach(getLinkDoms);
        return navLinkDoms;
    }

    return (
        <ul className="navbar-nav">
            {getLinks()}
        </ul>
    );
}

export default NavLinkBar;