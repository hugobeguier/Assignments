import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
export default function CreateJournal () {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const submitJournal = async () => {

        if(!user || !user.id){
            setError("You must be logged in to create a journal.")
            return;
        }

        const journalToSubmit = {
            ...formData,
            userId: user.id
        };

        await fetch("http://localhost:4000/create-journal", {
            method: "POST",
            body: JSON.stringify(journalToSubmit),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(async (data) => {
                const response = await data.json();

                if(response.success){
                    setSuccess(response.success);
                    navigate('/my-journals');
                } else {
                    setError(response.error);
                }
            });
    };
    
    return (
        <div>
            <h2 className="mt-4 text-xl font-semibold">Create Journal</h2>

            {success ?
                <p className="bg-green-500 text-white p-4 rounded-xl">
                    {success}
                </p> : null
            }
            {error ?
                <p className="bg-red-500 text-white p-4 rounded-xl">
                    {error}
                </p> : null
            }
            <div className="flex flex-col items-center">
                <input name="title" value={formData.title} onChange={handleFormChange} placeholder="Title" className="p-2 border-2 broder-gray-200 rounded-xl w-100"></input>
                <textarea name="description" value={formData.description} onChange={handleFormChange} placeholder="Description" className="text-justify mt-2 w-200 h-100 border-2 broder-gray-200 rounded-xl" style={{textAlign: 'left', paddingTop: '5px', paddingLeft: '5px'}}></textarea>
                <button onClick={submitJournal} className="px-4 py-2 bg-blue-500 text-white rounded-xl">
                    Submit Journal
                </button>
            </div>
            
        </div>
    );
}