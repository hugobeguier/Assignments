import { Link, useLocation } from "react-router-dom";

function NavBar () {
    return(
        <div className ="flex bg-blue-300 text-black p-4">
            <ul className="flex gap-4" onSelect={(e) => {
                
            }}>
                <NavItem title="Home" to="/"/>
                <NavItem title="UserList" to="/userlist"/>
            </ul>
        </div>
    );
}

function NavItem ({ title, to }) {

    const location = useLocation();
    let isActive = false;
    if(location.pathname === to) {
        isActive = true;
    }
    return(
        <li className={`hover:underline ${isActive == true ? "underline font-bold" : ""}`} >
            <Link to={to}>
                {title}
            </Link>
        </li>
    );
}


export default NavBar;