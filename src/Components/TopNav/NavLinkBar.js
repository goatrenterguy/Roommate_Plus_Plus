import NavLink from './NavLink'

function NavLinkBar(props) {
    return (
        <ul className="navbar-nav">
            <NavLink text="Link 1" href="page_1"/>
            <NavLink text="Mina Smells Bad" href="page_2"/>
        </ul>
    );
}

export default NavLinkBar;