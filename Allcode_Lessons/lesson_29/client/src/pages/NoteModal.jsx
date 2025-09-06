import { useEffect, useMemo, useState } from "react";

const statusBadgeClasses = (status) =>
  ({
    Backlog: "bg-gray-100 text-gray-700",
    "In Progress": "bg-blue-100 text-blue-700",
    "On Hold": "bg-yellow-100 text-yellow-700",
    Done: "bg-green-100 text-green-700",
  }[status] || "bg-gray-100 text-gray-700");

function toDateTimeLocalValue(value) {
  if (!value) return "";
  const d = new Date(value);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

export default function NoteModal({ note, user, onClose, onSaved }) {
  const [isEdit, setIsEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState(() => ({
    title: note?.title || "",
    description: note?.description || "",
    status: note?.status || "Backlog",
    dueDate: toDateTimeLocalValue(note?.dueDate),
  }));

  useEffect(() => {
    setDraft({
      title: note?.title || "",
      description: note?.description || "",
      status: note?.status || "Backlog",
      dueDate: toDateTimeLocalValue(note?.dueDate),
    });
    setIsEdit(false);
    setError("");
  }, [note]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const dateLabel = useMemo(
    () =>
      note?.dueDate
        ? new Date(note.dueDate).toLocaleDateString("en-CA")
        : "No due date",
    [note?.dueDate]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDraft((p) => ({ ...p, [name]: value }));
  };

  const save = async () => {
    try {
      setSaving(true);
      setError("");
      const res = await fetch(`http://localhost:4000/notes/${note.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title: draft.title,
          description: draft.description,
          status: draft.status,
          dueDate: draft.dueDate || null, 
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to save note");
      }
     
      onSaved(data.note);
      setIsEdit(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!note) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 mx-4 w-full max-w-3xl rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-xl font-semibold">{isEdit ? "Edit Note" : "View Note"}</h2>
          <div className="flex items-center gap-2">
            {!isEdit && (
              <button
                onClick={() => setIsEdit(true)}
                className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700"
              >
                Edit
              </button>
            )}
            <button onClick={onClose} className="rounded-md px-2 py-1 text-gray-500 hover:bg-gray-100" aria-label="Close">
              ✕
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 p-5 lg:grid-cols-[1fr_280px]">
          <div className="space-y-4">
            <div>
              <div className="mb-1 text-sm font-medium text-gray-700">Title</div>
              {isEdit ? (
                <input
                  name="title"
                  value={draft.title}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Short, clear summary…"
                />
              ) : (
                <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                  {note.title || <span className="text-gray-400">Untitled</span>}
                </div>
              )}
            </div>

            <div>
              <div className="mb-1 text-sm font-medium text-gray-700">Description</div>
              {isEdit ? (
                <textarea
                  name="description"
                  rows={8}
                  value={draft.description}
                  onChange={handleChange}
                  className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Details…"
                />
              ) : (
                <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 whitespace-pre-wrap">
                  {note.description || <span className="text-gray-400">No description</span>}
                </div>
              )}
            </div>

            <div className="text-sm text-gray-600">
              {isEdit ? (
                <div className="space-y-2">
                  <label className="block text-xs text-gray-600">Due date</label>
                  <input
                    type="datetime-local"
                    name="dueDate"
                    value={draft.dueDate}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                </div>
              ) : (
                <>Due: {dateLabel}</>
              )}
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            {isEdit && (
              <div className="flex items-center gap-2">
                <button
                  onClick={save}
                  disabled={saving}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Save"}
                </button>
                <button
                  onClick={() => {
                    setDraft({
                      title: note.title || "",
                      description: note.description || "",
                      status: note.status || "Backlog",
                      dueDate: toDateTimeLocalValue(note.dueDate),
                    });
                    setIsEdit(false);
                    setError("");
                  }}
                  className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <aside className="space-y-5">
            <section className="rounded-xl border p-4">
              <h3 className="mb-3 text-sm font-semibold text-gray-700">Assignee</h3>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                  {user?.initials}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-gray-900">{user?.fullName}</div>
                  <div className="truncate text-xs text-gray-500">{user?.email}</div>
                </div>
              </div>
            </section>

            <section className="rounded-xl border p-4">
              <h3 className="mb-3 text-sm font-semibold text-gray-700">Status</h3>
              {isEdit ? (
                <select
                  name="status"
                  value={draft.status}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option>Backlog</option>
                  <option>In Progress</option>
                  <option>On Hold</option>
                  <option>Done</option>
                </select>
              ) : (
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusBadgeClasses(
                    note.status
                  )}`}
                >
                  {note.status}
                </span>
              )}
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}