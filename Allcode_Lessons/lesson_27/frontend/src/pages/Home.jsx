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
            <h1 className="font-bold text-blue-400 mt-10 text-xl">Welcome {user.firstname}</h1>

            <div className="grid gap-10 pt-8 max-w-4xl mx-auto">
                {journals.map((journal,index) => (
                    <div className="border rounded-xl  flex flex-col gap-4 bg-blue-200 " key={index}>
                        <h3 className=" text-2xl italic font-semibold px-2 py-1 mt-2">
                            {journal.title}
                        </h3>
                       
                        <div className=" px-2 mt-2 ">
                            <h4 className="text-xl font-semibold">Content</h4>
                            <p className="font-bold mx-auto px-2 border rounded bg-white">
                                {journal.description.length > 50 
                                ? `${journal.description.slice(0,50)}...` 
                                : journal.description}
                            </p>
                        </div>
                                    
                        <Link to={`/open-journal/${journal.id}`} className="bg-cyan-200 px-4 py-2 text-center rounded-xl mb-2 mx-auto shadow-lg">
                            View Journal
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}