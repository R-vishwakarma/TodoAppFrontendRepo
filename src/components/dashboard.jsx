import React, { useEffect, useState } from "react";
import {
  getUserTodos,
  getTodosByCategory,
  getTodosByPriority,
  searchTodos,
  handleStatusToggle,
} from "../services/todoService";
import TodoList from "./Todo/TodoList";
import { useNavigate } from "react-router-dom";
import NavScrollExample from "./Navbar";

const categoryMap = {
  0: "Work",
  1: "Personal",
  2: "Home",
};

const priorityMap = {
  0: "Low",
  1: "Medium",
  2: "High",
};

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await getUserTodos();
      setTodos(data);
      setFilteredTodos(data);
    } catch (error) {
      setMessage(error.message || "Error fetching todos");
      resetMessage();
    }
  };

  const handleCategoryChange = async (e) => {
    const selectedCategory = e.target.value;
    setCategoryFilter(selectedCategory);
    setPriorityFilter("");
    try {
      if (selectedCategory === "") {
        await fetchTodos();
      } else {
        const data = await getTodosByCategory(selectedCategory);
        setTodos(data);
        setFilteredTodos(data);
      }
    } catch (error) {
      setMessage(error.message || "Error fetching todos by category");
      resetMessage();
    }
  };

  const handlePriorityChange = async (e) => {
    const selectedPriority = e.target.value;
    setPriorityFilter(selectedPriority);
    setCategoryFilter("");
    try {
      if (selectedPriority === "") {
        await fetchTodos();
      } else {
        const data = await getTodosByPriority(selectedPriority);
        setTodos(data);
        setFilteredTodos(data);
      }
    } catch (error) {
      setMessage(error.message || "Error fetching todos by priority");
      resetMessage();
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const data = await searchTodos(searchQuery);
      setFilteredTodos(data.length ? data : []);
      if (!data.length) setMessage("No todos found for the search term");
      resetMessage();
    } catch (error) {
      setMessage(error.message || "Error searching todos");
      resetMessage();
    }
  };

  const fetchAllTodos = async () => {
    try {
      await fetchTodos();
    } catch (error) {
      setMessage(error.message || "Error fetching all todos");
      resetMessage();
    }
  };

  const resetMessage = () => {
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <div>
      <NavScrollExample />

      {message && <p className="alert alert-info">{message}</p>}

      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <h2>Your Todo List</h2>
      </div>

      {/* Filters, Search, and Actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <select
          value={categoryFilter}
          onChange={handleCategoryChange}
          className="form-select"
          style={{ width: "200px" }}
        >
          <option value="">All Categories</option>
          <option value="0">Work</option>
          <option value="1">Personal</option>
          <option value="2">Home</option>
        </select>

        <select
          value={priorityFilter}
          onChange={handlePriorityChange}
          className="form-select"
          style={{ width: "200px" }}
        >
          <option value="">All Priorities</option>
          <option value="0">Low</option>
          <option value="1">Medium</option>
          <option value="2">High</option>
        </select>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Todos"
            className="form-control"
            style={{
              borderRadius: "25px",
              padding: "0.5rem 1rem",
              width: "200px",
            }}
          />
          <button
            className="btn btn-outline-dark"
            onClick={handleSearch}
            style={{
              borderRadius: "25px",
              padding: "0.5rem 1.5rem",
              transition: "background-color 0.3s",
            }}
          >
            Search
          </button>
        </div>

        <button
          className="btn btn-outline-dark"
          onClick={() => navigate("/add-todo")}
        >
          Add New Todo
        </button>

        <button
          className="btn btn-outline-dark"
          onClick={fetchAllTodos}
        >
          Fetch All Todos
        </button>
      </div>

      <TodoList
        todos={filteredTodos.map((todo) => ({
          ...todo,
          category: categoryMap[todo.category] || "Unknown",
          priority: priorityMap[todo.priority] || "Unknown",
        }))}
        setTodos={setTodos}
        handleStatusToggle={handleStatusToggle}
      />
    </div>
  );
};

export default Dashboard;
