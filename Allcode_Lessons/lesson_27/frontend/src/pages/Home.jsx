import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Home () {

    const { user } = useAuth();
    const [journals, setJournals] = useState([]);

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">You must be logged in to view this page</h1>
                <Link to='/login' className="mt-4 px-4 py-2 bg-blue-200 text-white reounded">Go to Login</Link>
            </div>
        );
    }
  
    useEffect(() => {
        const getJournals = async () => {
            await fetch("http://localhost:4000/get-all-journals")
                .then (async (data) => {
                    const response = await data.json();
                    setJournals(response);
                });
        }

        getJournals();
    
    },[]);

    return (
        <div>
            <h1>Welcome {user.username}</h1>
            <p>Journal Posts</p>

            <div className="grid gap-10 pt-8 max-w-4xl mx-auto">
                {journals.map((journals,index) => (
                    <div className="border rounded-xl flex flex-col gap-4 " key={index}>
                        <h3 className="text-center text-2xl font-bold mx-auto px-2 py-1 mt-2">
                            {journals.title}
                        </h3>
                        <Link to={'/post/'+journals.id} className="bg-blue-200 px-4 py-2 text-center rounded-xl mb-2 mx-auto">
                            View Journal
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}