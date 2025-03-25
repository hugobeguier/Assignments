import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditJournal() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [journal, setJournal] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJournal((prevJournal) => ({
            ...prevJournal,
            [name]: value,
        }));
    };

    const deleteJournal = async () => {
        const response = await fetch(`http://localhost:4000/delete-journal/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            navigate("/my-journals");
        } else {
            alert("Failed to delete journal");
        }
    };

    const saveJournal = async () => {
        const response = await fetch(`http://localhost:4000/update-journal/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: journal.title,
                description: journal.description,
            }),
        });

        if (response.ok) {
            alert("Journal updated successfully!");
            navigate("/my-journals");
        } else {
            alert("Failed to update journal");
        }
    };

    useEffect(() => {
        const fetchJournal = async () => {
            const res = await fetch(`http://localhost:4000/get-journal/${id}`);
            const data = await res.json();
            setJournal(data);
        };

        fetchJournal();
    }, [id]);

    
    if (!journal) return <p>Loading Journal...</p>;

    return (
        <div>
            <div className="flex justify-between gap-8 mt-10">
                <h1 className=" text-xl font-bold text-blue-400">Edit Journal</h1>
                <div>
                    <button className="w-auto border rounded bg-red-400 hover:bg-red-200 " onClick={deleteJournal}>Delete Journal</button>
                </div>
            </div>
            
            <div className="max-w-2xl mx-auto p-4 border rounded-xl bg-blue-200 z-0 mt-10">
                <input
                    type="text"
                    name="title"
                    value={journal.title || ''} 
                    onChange={handleChange}
                    className="w-full p-2 mb-4 text-xl border rounded bg-white"
                />

                <div className="border rounded mt-4 z-10 bg-white">
                    <h3 className="font-semibold text-center shadow-2xs">Content</h3>
                    <textarea
                        name="description"
                        value={journal.description || ''}  
                        onChange={handleChange}
                        className="w-full p-2 mt-2 mb-2 border rounded"
                        rows="4"
                    />
                </div>
            </div>

            <div className="max-w-2xl mx-auto p-4 mt-4">
                <button onClick={saveJournal} className="bg-blue-500 text-white p-2 rounded">
                    Save Changes
                </button>
            </div>
        </div>
    );
}