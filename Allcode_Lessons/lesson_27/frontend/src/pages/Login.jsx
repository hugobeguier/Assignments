import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from 'react';

export default function Login() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        console.log("Attempting login with:", { email, password });

        const success = await login(email, password);
        if(success){
            navigate('/');
        }else {
            alert("Invalid credentials");
        }
    }
    
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="tex-2xl font-bold">Login</h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-4">
                <input 
                    type="email"
                    placeholder="email"
                    value = {email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border px-4 py-2"
                />

                <input 
                    type="password"
                    placeholder="password"
                    value = {password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border px-4 py-2"
                />
                <Link to='/create-account' className="text-green-500">Don't have an account, click here!</Link>
                <button type="submit" className="bg-blue-200 px-4 py-2 rounded">Login</button>

            </form>
        </div>
    );
}