import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialNote = {
    title: "",
    description: "",
    status: "Backlog",
    assigneeId: "",
    dueDate: ""
};

export default function Note() {

    const [note, setNote] = useState(initialNote);
    const [error, setError] = useState("");
    const [user, setUser] = useState({});
    const navigate = useNavigate();
   
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNote((prev) => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setNote(initialNote);
        navigate("/home");
    };

    useEffect(() => {
    
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
    
            getUser();
        }, []);


    const CreateNewNote = async () => {
      
        const res = await fetch("http://localhost:4000/createNote", {
            method: "POST",
            body: JSON.stringify({ noteData: note }),
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
        });
        const response = await res.json();

        if (response.success) {
            navigate("/home");

        } else if (response.error) {
            setError(response.error);
            setNote(initialNote);
        }
    };

    const statusBadgeClasses = {
    "Backlog": "bg-gray-100 text-gray-700",
    "In Progress": "bg-blue-100 text-blue-700",
    "On Hold": "bg-yellow-100 text-yellow-700",
    "Done": "bg-green-100 text-green-700",
  }[note.status] || "bg-gray-100 text-gray-700";

    return (
        <main>
            <div className="flex justify-center mt-5">
                <h1 className="inline-block mx-auto font-semibold text-2xl shadow px-2 bg-gray-100 rounded-xl">Create a new note that only you can see</h1>
            </div>

            <div className="mx-auto mt-8 max-w-4xl">
                <div className="rounded-2xl border bg-white shadow-sm">
                    <form onSubmit={(e) => {e.preventDefault(); CreateNewNote();}} className="grid grid-cols-1 gap-6 p-5 lg:grid-cols-[1fr_280px]">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    id="title"
                                    name="title"
                                    value={note.title}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Short, clear summary…"
                                    className="w-full rounded-lg border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="desc" className="mb-1 block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    id="desc"
                                    name="description"
                                    rows={8}
                                    value={note.description}
                                    onChange={handleChange}
                                    placeholder="Steps to reproduce, expected/actual, acceptance criteria…"
                                    className="w-full resize-y rounded-lg border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    type="submit"
                                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                            </div>

                            {error && (
                                <p className="text-sm text-red-600">{error}</p>
                            )}
                        </div>

                        <aside className="space-y-5">
                            <section className="rounded-xl border p-4">
                                <h3 className="mb-3 text-sm font-semibold text-gray-700">Assignee</h3>
                                <div className="flex items-center gap-3">
                                    <div className="grid h-10 w-10 place-items-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                                        {user.initials}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="truncate text-sm font-medium text-gray-900">{user.fullName}</div>
                                        <div className="truncate text-xs text-gray-500">{user.email}</div>
                                    </div>
                                </div>
                            </section>

                            <section className="rounded-xl border p-4">
                                <h3 className="mb-3 text-sm font-semibold text-gray-700">Status</h3>
                                <div className="flex items-center justify-between">
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusBadgeClasses}`}>
                                        {note.status}
                                    </span>
                                </div>

                                <div className="mt-3">
                                    <label htmlFor="status" className="mb-1 block text-xs font-medium text-gray-600">
                                        Change status
                                    </label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={note.status}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option>Backlog</option>
                                        <option>In Progress</option>
                                        <option>On Hold</option>
                                        <option>Done</option>
                                    </select>
                                </div>
                            </section>
                            <section className="rounded-xl border p-4">
                                <h3 className="mb-3 text-sm font-semibold text-gray-700">Set due date</h3>
                                
                                <div className="mt-3">
                                    <label htmlFor="status" className="mb-1 block text-xs font-medium text-gray-600">
                                        Set Due Date
                                    </label>
                                    <input
                                        id="dueDate"
                                        name="dueDate"
                                        value={note.dueDate}
                                        onChange={handleChange}
                                        type="date"
                                        className="w-full rounded-lg border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                            </section>
                        </aside>
                    </form>
                </div>
            </div>
        </main>
    )
}