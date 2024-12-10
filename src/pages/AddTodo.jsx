import React from "react";
import { useNavigate } from "react-router-dom";
import CreateTodoForm from "../components/Todo/TodoForm";
import NavScrollExample from "../components/Navbar";

const AddTodo = () => {
  const navigate = useNavigate();

  const handleTodoAdded = (newTodo) => {
    console.log("Todo added: ", newTodo);
  };

  return (
    <>
      <NavScrollExample />

      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2 style={{ marginBottom: "2rem", fontWeight: "bold" }}>Add a New Todo</h2>

        {/* Form for creating a todo */}
        <CreateTodoForm onTodoAdded={handleTodoAdded} />

        {/* Styling for the entire section */}
      </div>
    </>
  );
};

export default AddTodo;
