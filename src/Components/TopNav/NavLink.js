function NavLink(props) {
    return (
        <li className="nav-item">
            <a className="nav-link" href={props.href}>{props.text}</a>
        </li>
    );
}
export default NavLink;