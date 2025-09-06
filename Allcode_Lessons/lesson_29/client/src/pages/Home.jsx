import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NoteModal from "./NoteModal";

export default function Home () {

    const [notes, setNotes] = useState([]);
    const [user, setUser] = useState({});
    const [selectedNote, setSelectedNote] = useState(null);

    const logout = () => {
        localStorage.removeItem("token");
        setNotes([]);
        setUser({});
    }

    useEffect(() => {
    const getNotes = async () => {
        const res = await fetch("http://localhost:4000/getNotes", {
        method: "GET",
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
        });
        const response = await res.json();
        if (response.notes) setNotes(response.notes);
    };

    const getUser = async () => {
      const res = await fetch("http://localhost:4000/getCurrentUser", {
        method: "GET",
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
        });
        const response = await res.json();
        if (response.user) setUser(response.user);
        };

        getNotes();
        getUser();
    }, []);

    const openNote = (note) => setSelectedNote(note);
    const closeNote = () => setSelectedNote(null);

    const handleSaved = (updated) => {
        setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
        setSelectedNote(updated);
    };

    return (
        <main className="flex flex-col gap-6 px-24 py-8">
            <div className="flex justify-between">
                <h1 className="text-4xl font-semibold">
                    Your Notes
                </h1>
                {user.id ? 
                    <Link to={"/createNote"}>Add Note</Link>
                    : null
                }
            </div>
            {user.id ? <p>Welcome {user.fullName}! </p> : <p>Login or register an account to see your notes.</p> }
            {user.id ? 
                <>
                    {notes.length > 0 ?
                        <div className="flex flex-col gap-6">
                            {notes.map((note, index) => (
                                <button
                                    key={note.id ?? note.title} 
                                    onClick={() => openNote(note)}
                                    className="rounded-xl bg-gray-100 p-4 text-left transition hover:bg-gray-200"
                                >
                                    <p className="font-medium">{note.title}</p>
                                    <p className="text-sm text-gray-600">
                                    Due: {note.dueDate ? new Date(note.dueDate).toLocaleDateString("en-CA") : "No due date"}
                                    </p>
                                </button>  
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
           
            {selectedNote && (
                <NoteModal
                    note={selectedNote}
                    user={user}
                    onClose={closeNote}
                    onSaved={handleSaved}
                />
            )}
        </main>
    );
}