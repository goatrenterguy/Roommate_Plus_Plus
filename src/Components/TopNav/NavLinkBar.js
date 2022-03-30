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
        function getLinkDoms(value) {
            navLinkDoms.push(<NavLink text={value.text} href={value.href}/>);
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