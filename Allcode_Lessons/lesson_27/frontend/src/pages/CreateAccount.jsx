import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAccount () {

    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:4000/create-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email, firstname, lastname, password}),
        });
        
        const data = await response.json();
        if(data.success) {
            alert("Account created! You can now log in");
            navigate('/login');
        }else {
            alert('Error: ' + data.error);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Create Account</h1>
            <form onSubmit={handleRegister} className="space-y-4">
                <input
                    type="email"
                    placeholder="email"
                    className="w-full p-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="firstname"
                    placeholder="firstname"
                    className="w-full p-2 border rounded"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                />
                <input
                    type="lastname"
                    placeholder="lastname"
                    className="w-full p-2 border rounded"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="password"
                    className="w-full p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="w-full bg-blue-500 p-w rounded">Sign up</button>
            </form>
        </div>
    );
}