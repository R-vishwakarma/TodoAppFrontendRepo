import React, { useState } from "react";
import { createTodo } from "../../services/todoService";
import "../../styles/CreateTodoForm.css"; // Import the CSS file

const CreateTodoForm = ({ onTodoAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
    category: "Work",
  });

  const [message, setMessage] = useState({
    text: "",
    type: "", // "success" or "error"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTodo = await createTodo(formData);
      setMessage({ text: "Todo added successfully!", type: "success" });
      onTodoAdded(newTodo);
      setFormData({
        title: "",
        description: "",
        priority: "Low",
        category: "Work",
      });
      resetMessage(); // Reset the message after 3 seconds
    } catch (error) {
      setMessage({
        text: error.message || "Error adding todo.",
        type: "error",
      });
      resetMessage(); // Reset the message after 3 seconds
    }
  };

  // Function to reset the message after 3 seconds
  const resetMessage = () => {
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 3000); // 3 seconds
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h3 className="form-title">Add Todo</h3>
        {message.text && (
          <p
            className={`message ${message.type === "success" ? "success-message" : "error-message"}`}
          >
            {message.text}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="form-textarea"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="priority">Priority:</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="form-select"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-select"
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Home">Home</option>
            </select>
          </div>
          <button type="submit" className="form-button">
            Add Todo
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTodoForm;
