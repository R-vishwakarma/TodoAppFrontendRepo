import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { deleteTodo, handleStatusToggle as toggleTodoStatusService } from "../../services/todoService";
import { useNavigate } from "react-router-dom";

const TodoList = ({ todos = [], setTodos }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

       window.location.reload(); 
      setMessage("Todo deleted successfully");
    } catch (error) {
      setMessage("Error deleting todo");
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const updatedStatus = currentStatus === "Completed" ? "Pending" : "Completed"; // Toggle the status

    try {
      // Set loading state when toggling
      setLoading(true);

      // Call the API to update the status on the backend
      await toggleTodoStatusService(id, updatedStatus);

      // Refresh the page to reflect the updated status and data
      window.location.reload();
    } catch (error) {
      setMessage("Error updating todo status");
    } finally {
      setLoading(false); // Set loading state to false once the process is complete
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <div>
      {message && <p className="alert alert-info">{message}</p>}
      {loading && <div>Loading...</div>} {/* Show loading message when status is being toggled */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(todos) && todos.length > 0 ? (
            todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={!!todo.isCompleted}
                    onChange={() => handleStatusToggle(todo.id, todo.isCompleted)}
                  />
                </td>
                <td>{todo.category}</td>
                <td>{todo.priority}</td>
                <td>{formatDate(todo.createdAt)}</td>
                <td>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => handleEdit(todo.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDelete(todo.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No todos available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default TodoList;
