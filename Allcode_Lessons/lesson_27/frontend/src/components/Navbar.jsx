import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar () {
    
    const { user, logout } = useAuth(); 
   
    return (
        <div className="flex justify-between gap-8 items-center border-l-[2px] ">
           <div className="flex gap-8">
                <Link to="/" className="ml-2 text-2xl font-semibold hover:text-blue-300">
                    Home
                </Link>
                <Link to="/my-journals" className="text-2xl font-semibold hover:text-blue-300">
                    My Journals
                </Link>
           </div>

            <div className="text-2xl font-semibold hover:text-blue-300">
                {user ? (
                    <button onClick={logout}>Logout</button>
                ) : (
                    <a href="/login">Login</a>
                )}
            </div>
        </div>
    );
}