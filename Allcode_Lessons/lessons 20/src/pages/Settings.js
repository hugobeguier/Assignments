
import Header from "../components/Header";

import ThemeContext from "../contexts/ThemeContext";
import { useContext } from "react";
function Settings () {
const {isDark,toggleTheme} = useContext(ThemeContext); 

    return (
        <div>
            <h2>Settings</h2>
            <Header/>
            
            <button  className= "border-2 bg-green-600 border-green-600 solid rounded  hover:border-black"  value="Change Theme" 
                onClick={toggleTheme}>
                   {isDark ? <> Change to Light Mode</> : <>Change to Dark Mode</> }
                </button>
        </div>
    );
}

export default Settings;