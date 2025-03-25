
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Journal () {
    
    const navigate = useNavigate();
    const { user } = useAuth();

    const [journals, setJournals] = useState([]);
    
    useEffect(() => {
        const getJournals = async () => {

            await fetch(`http://localhost:4000/get-journals-from-user/${user.id}`)
                .then (async (data) => {
                    const response = await data.json();
                    setJournals(response);
                console.log(journals);            
                }); 
        }
        
        getJournals();

    },[]);

    return (
        <div>
            <div className="flex justify-between items-center gap-4 pt-8 font-semibold">
                <h2 className="text-xl">
                    My Journals
                </h2>
                <div>
                    <button onClick={() => navigate('/create-journal')} className="px-2 bg-green-200 rounded-xl hover:text-gray-100">
                        Create New Journal
                    </button>
                </div>
            </div>
            <div className="grid gap-10 pt-8 max-w-4xl mx-auto">
                {journals.map((journal,index) => (
                    <div className="border rounded-xl flex flex-col gap-4 " key={index}>
                        <h3 className="text-center text-2xl font-bold mx-auto px-2 py-1 mt-2">
                            {journal.title}
                        </h3>
                        <Link to={`/edit-journal/${journal.id}`} className="bg-blue-200 px-4 py-2 text-center rounded-xl mb-2 mx-auto">
                            Edit Journal
                        </Link>
                    </div>
                ))}
            </div>
        </div>
       
    );
}