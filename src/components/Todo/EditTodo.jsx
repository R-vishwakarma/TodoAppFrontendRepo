import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTodoById, updateTodo } from "../../services/todoService";
import NavScrollExample from "../Navbar";

const EditTodoForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [todo, setTodo] = useState(null);
    const [message, setMessage] = useState({
        text: "",
        type: "", // "success" or "error"
    });

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const data = await getTodoById(id);
                const PRIORITY_MAP = {
                    0: "Low",
                    1: "Medium",
                    2: "High",
                };

                const CATEGORY_MAP = {
                    0: "Work",
                    1: "Personal",
                    2: "Home",
                };

                setTodo({
                    ...data,
                    priority: PRIORITY_MAP[data.priority],
                    category: CATEGORY_MAP[data.category],
                });
            } catch (error) {
                setMessage({ text: "Failed to fetch todo details.", type: "error" });
            }
        };
        fetchTodo();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTodo({
            ...todo,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateTodo(id, todo); // Directly send strings
            setMessage({ text: "Todo updated successfully!", type: "success" });
            navigate("/dashboard"); // Redirect to dashboard
        } catch (error) {
            setMessage({
                text: error.message || "Error updating todo.",
                type: "error",
            });
        }
    };

    if (!todo) return <p>Loading...</p>;

    return (
        <>
            <NavScrollExample />
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    backgroundColor: "#f4f4f4",
                }}
            >
                <div
                    style={{
                        backgroundColor: "#fff",
                        padding: "1rem",  // Reduced padding for smaller height
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        maxWidth: "350px",  // Reduced width
                        width: "100%",
                    }}
                >
                    <h3 style={{ textAlign: "center", marginBottom: "0.5rem" }}>Edit Todo</h3>
                    {message.text && (
                        <p
                            style={{
                                textAlign: "center",
                                color: message.type === "success" ? "green" : "red",
                                marginBottom: "0.5rem",
                            }}
                        >
                            {message.text}
                        </p>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: "1rem" }}>
                            <label htmlFor="title" style={{ display: "block", marginBottom: "0.3rem" }}>
                                Title:
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={todo.title || ""}
                                onChange={handleChange}
                                required
                                style={{
                                    width: "100%",
                                    padding: "0.4rem",  // Reduced padding
                                    borderRadius: "4px",
                                    border: "1px solid #ccc",
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: "1rem" }}>
                            <label htmlFor="description" style={{ display: "block", marginBottom: "0.3rem" }}>
                                Description:
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={todo.description || ""}
                                onChange={handleChange}
                                required
                                style={{
                                    width: "100%",
                                    padding: "0.4rem",  // Reduced padding
                                    borderRadius: "4px",
                                    border: "1px solid #ccc",
                                }}
                            ></textarea>
                        </div>
                        <div style={{ marginBottom: "1rem" }}>
                            <label htmlFor="priority" style={{ display: "block", marginBottom: "0.3rem" }}>
                                Priority:
                            </label>
                            <select
                                id="priority"
                                name="priority"
                                value={todo.priority || ""}
                                onChange={handleChange}
                                style={{
                                    width: "100%",
                                    padding: "0.4rem",  // Reduced padding
                                    borderRadius: "4px",
                                    border: "1px solid #ccc",
                                }}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: "1rem" }}>
                            <label htmlFor="category" style={{ display: "block", marginBottom: "0.3rem" }}>
                                Category:
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={todo.category || ""}
                                onChange={handleChange}
                                style={{
                                    width: "100%",
                                    padding: "0.4rem",  // Reduced padding
                                    borderRadius: "4px",
                                    border: "1px solid #ccc",
                                }}
                            >
                                <option value="Work">Work</option>
                                <option value="Personal">Personal</option>
                                <option value="Home">Home</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: "1rem" }}>
                            <label htmlFor="isCompleted" style={{ display: "block", marginBottom: "0.3rem" }}>
                                Completed:
                            </label>
                            <input
                                type="checkbox"
                                id="isCompleted"
                                name="isCompleted"
                                checked={todo.isCompleted || false}
                                onChange={handleChange}
                                style={{ marginLeft: "0.5rem" }}
                            />
                        </div>
                        <button
                            type="submit"
                            style={{
                                width: "100%",
                                padding: "0.6rem",  // Reduced padding
                                borderRadius: "4px",
                                border: "none",
                                backgroundColor: "#000",
                                color: "#fff",
                                cursor: "pointer",
                            }}
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditTodoForm;
