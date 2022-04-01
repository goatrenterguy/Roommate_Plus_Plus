import NavLink from './NavLink'
import React from 'react'
import getNavLinks from "../DataObjects/getNavLinks";
class NavLinkBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            'links': getNavLinks
        };
        this.getLinks = this.getLinks.bind(this);
    }

    getLinks() {
        let navLinkDoms = [];
        let linkId = 0;
        function getLinkDoms(value) {
            navLinkDoms.push(<NavLink key={"navLink" + linkId} text={value.text} href={value.href}/>);
            linkId++;
        }
        this.state.links.forEach(getLinkDoms);
        return navLinkDoms;
    }

    render() {
        return (
            <ul className="navbar-nav">
                {this.getLinks()}
            </ul>
        );
    }
}

export default NavLinkBar;