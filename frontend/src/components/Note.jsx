import { useState, useEffect } from "react";
import "./Note.css";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";





export default function Note() {
  const [filter, setFilter] = useState("all");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();


  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  const fetchNotes = async () => {
    const res = await axiosInstance.get("/notes/getNotes");
    setNotes(res.data.notes);
  };

  useEffect(() => {
    fetchNotes();
  }, []);


  const handleAddOrEdit = async () => {
    if (editId) {

      await axiosInstance.post(
        "/notes/notesEdit",
        {
          noteId: editId,
          title,
          content,
        }
      );
      setEditId(null);
    } else {

      await axiosInstance.post(
        "/notes/notesAdd",
        {
          title,
          content,
        }
      );
    }

    setTitle("");
    setContent("");
    fetchNotes();
  };


  const handleDelete = async (noteId) => {
    await axiosInstance.post(
      "/notes/notesDelete",
      {
        noteId,
      }
    );
    fetchNotes();
  };


  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note._id);
  };


  const filteredNotes = notes

  .filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => {
    if (filter === "az") {
      return a.title.localeCompare(b.title);
    }
    if (filter === "za") {
      return b.title.localeCompare(a.title);
    }
    if (filter === "new") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (filter === "old") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return 0; 
  });


  return (
    <div className="main-container">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>

 
      <div className="noteForm">
        <h4>{editId ? "Edit Note" : "Add Note"}</h4>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button onClick={handleAddOrEdit}>
          {editId ? "Update Note" : "Add Note"}
        </button>
      </div>


      <div style={{ display: "flex", gap: "15px" }}>
  <input
    type="text"
    placeholder="Search notes..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{ padding: "10px", width: "250px" }}
  />

  <select
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    style={{ padding: "10px" }}
  >
    <option value="all">All Notes</option>
    <option value="az">Title (A–Z)</option>
    <option value="za">Title (Z–A)</option>
    <option value="new">Newest First</option>
    <option value="old">Oldest First</option>
  </select>
</div>


      <div className="notes-container">
        {filteredNotes.map((note) => (
          <div
            key={note._id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              width: "200px",
            }}
          >
            <h3>{note.title}</h3>
            <p>{note.content}</p>

            <button onClick={() => handleEdit(note)}>
              Edit
            </button>

            <button onClick={() => handleDelete(note._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
