
import ThemeContext from "../contexts/ThemeContext";
import { useContext } from "react";
function Header () {
    const {isDark,toggleTheme} = useContext(ThemeContext);
    
    return(
        <div>
             {isDark ? <h3>Current theme: Dark Mode</h3> : <h3>Current theme: Light Mode</h3>}
        </div>
    );
}

export default Header;