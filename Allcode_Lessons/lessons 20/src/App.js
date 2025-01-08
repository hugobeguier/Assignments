import { Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
//import { useState } from "react";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

import ThemeContext from "./contexts/ThemeContext";
import { useState} from "react";

function App() {

  const [isDark,setIsDark] = useState(true);
  
  const toggleTheme = () => {
    if(isDark){
      setIsDark(false);
    }else{
      setIsDark(true);
    }
  }

  return (
    <ThemeContext.Provider value={{isDark,toggleTheme}}>{/*Provides the info to the context that the NavBar uses afterwards*/}
      <div className={`${isDark ? "bg-gray-600 text-white" : "bg-white text-black"} min-h-screen`}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
    </ThemeContext.Provider>
    
  );
}

export default App;
