import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function JournalCard () {

    const { id } = useParams();
    const [journal, setJournal] = useState(null);

    useEffect(() => {
        const fetchJournal = async () => {
            const res = await fetch(`http://localhost:4000/get-journal/${id}`);
            const data = await res.json();
            setJournal(data);
        }

        fetchJournal();
    },[id]);

    if(!journal) return <p>Loading Journal...</p>;

    return (
        <div>
            <h1 className="mt-10 text-xl font-bold text-blue-400">Journal Card</h1>
            <div className="max-w-2xl mx-auto p-4 border rounded-xl bg-blue-200 z-0 mt-10">
                <h2 className="text-2xl font-semibold">{journal.title}</h2>
                
                <div className="border rounded mt-4 z-10 bg-white">
                    <h3 className="font-semibold text-center shadow-2xs">Content</h3>
                    <p className="px-2 mt-2 mb-2">{journal.description}</p>            
                </div>
            </div> 
        </div>
    );
        
}