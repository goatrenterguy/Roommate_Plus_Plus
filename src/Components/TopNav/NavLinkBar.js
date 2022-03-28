import NavLink from './NavLink'

function NavLinkBar(props) {
    return (
        <ul className="navbar-nav">
            <NavLink text="Link 1" href="#"/>
            <NavLink text="Mina Smells Bad" href="https://www.google.com/search?q=mina+smells+bad"/>
        </ul>
    );
}

export default NavLinkBar;