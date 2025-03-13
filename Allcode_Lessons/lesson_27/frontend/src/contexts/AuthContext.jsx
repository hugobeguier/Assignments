import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }, // ✅ FIXED typo
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
            console.log("Login Response:", data); // ✅ Debugging log
    
            if (response.ok) {
                setUser(data.user);
                return true;
            } else {
                console.error("Login failed:", data.error); // ✅ Log backend error
                return false;
            }
        } catch (error) {
            console.error("Login error:", error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value = {{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};