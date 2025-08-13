import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home () {
    
    const [notes, setNotes] = useState([]);
    const [user, setUser] = useState({});

    const logout = () => {
        localStorage.removeItem("token");
        setNotes([]);
        setUser({});
    }

    useEffect (() => {

        const getNotes = async () => {
            await fetch("http://localhost:4000/getNotes", {
                method: "GET",
                headers: {
                    "x-access-token": localStorage.getItem("token")
                }
            }).then(async(data) => {
                const response = await data.json();

                if (response.notes) {
                    setNotes(response.notes);
                } 
            })
        }

        const getUser = async () => {
            await fetch("http://localhost:4000/getCurrentUser", {
                method: "GET",
                headers: {
                    "x-access-token": localStorage.getItem("token")
                }
            }).then(async(data) => {
                const response = await data.json();
                
                if (response.user) {
                    setUser(response.user);
                }
            })
        }

        getNotes();
        getUser();

    }, []);

    const CreateNewNote = async () => {
        await fetch("http://localhost:4000/create-note", {
            method: "POST",
            body: JSON.stringify({ notes: note }),
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("Token")
            }
        }).then(async(data) => {
            const response = await data.json();

            if (response.success) {
                navigate("/add-note");
            } else if (response.error) {
                SpeechSynthesisErrorEvent(response.error);
                setNotes("");
            } else {
                setError("Something went wrong with your request.");
            }

        });
    };

    return (
        <main className="flex flex-col gap-6 px-24 py-8">
            <div className="flex justify-between">
                <h1 className="text-4xl font-semibold">
                    Your Notes
                </h1>
                {user.id ? 
                    <Link onClick={CreateNewNote}>Add Note</Link>
                    : null
                }
            </div>
            {user.id ? <p>Welcome {user.fullName}! </p> : <p>Login or register an account to see your notes.</p> }
            {user.id ? 
                <>
                    {notes.length > 0 ?
                        <div className="flex flex-col gap-6">
                            {notes.map((note, index) => (
                                <div className="bg-gray-300 p-6 rounded-xl" key={index}>
                                    <p>{note.textArea}</p>
                                </div>   
                            ))}
                        </div>
                        : <p> You have not added any notes yet. </p>                     
                    }
                </> : null
            }
            <div className="flex gap-4">
                    {user.id ? 
                        (
                            <button onClick={logout} className="underline font-semibold">Logout</button>
                        ):(
                            <>
                                <Link to={"/register"} className="underline font-semibold">Register</Link>
                                <p>or</p> 
                                <Link to={"/login"} className="underline font-semibold">Login</Link>
                            </>
                        )
                    }
            </div>
        </main>
    );
}