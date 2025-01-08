import { Link } from "react-router-dom";

function NavBar () {
   

    return (
        
            <nav className="flex bg-rose-500 text-white p-4">
                <ul className="flex gap-4 ">
                    <NavItem title="Home" to="/"/>
                    <NavItem title="About" to="/about"/>
                    <NavItem title="Contact" to="/contact"/>
                    <NavItem title="Settings" to="/settings"/>
                </ul>
            </nav>
    );
}

function NavItem ({ title, to }){
    return (

        <li>
            <Link to={to}>
                {title}
            </Link>
        </li>
    );
}


export { NavBar };