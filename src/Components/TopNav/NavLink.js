import {Link} from "react-router-dom";
function NavLink(props) {
    return (
        <li className="nav-item">
            <Link className="nav-link" to={props.href}>{props.text}</Link>
        </li>
    );
}
export default NavLink;