import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login ({ setCanAnswerQuizzes }) {

    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const login = async () => {

        try {
            const response = await fetch("http://localhost:4000/login", {
            method: "POST",
            body: JSON.stringify({ email: email, password: password }),
            headers: {
                "Content-Type": "application/json"
            },
        });
        
        const data = await response.json();

        if (data.token) {
            localStorage.setItem("token", data.token);
            setCanAnswerQuizzes("yes"); 
            navigate("/");
        } else if (data.error) {
            setError(data.error);
        } else {
            setError("Something went wrong, please try again later.");
        }

        } catch (err) {
            setError("Server error.");
            console.error(err);
        } 
    };

    return (
        <main className="flex flex-col gap-6 px-24 py-8">
            <h2 className="text-2xl font-semibold">Login</h2>
            <p>
                Login to your account!
            </p>
            <p>
                Don't have an account? 
            </p>
            <Link to={`/register`} className="text-green-500" >Register here</Link>
            {error ?
                <p className="bg-red-500 text-white p-4 rounded-xl">
                    {error}
                </p> : null
            }
            <input value={email} onChange={(e) => (setEmail(e.target.value))} placeholder="Email" type="email" className="border-2 border-gray-200 p-2 rounded-xl" />
            <input value={password} onChange={(e) => (setPassword(e.target.value))} placeholder="Password" type="password" className="border-2 border-gray-200 p-2 rounded-xl" />
            <button onClick={login} className="bg-black text-white p-2 rounded-xl">Login!</button>
        </main>
    );
}