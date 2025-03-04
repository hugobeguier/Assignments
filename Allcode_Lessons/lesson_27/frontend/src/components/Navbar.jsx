import { Link } from "react-router-dom";

export default function Navbar () {
    return (
        <div className="flex gap-8 items-center border-l-[2px] ">
            <Link to="/" className="ml-2 text-2xl font-semibold hover:text-blue-300">
                Home
            </Link>
            <Link to="/my-journals" className="text-2xl font-semibold hover:text-blue-300">
                My Journals
            </Link>
        </div>
    );
}