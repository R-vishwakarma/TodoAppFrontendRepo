import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./components/dashboard";
import AddTodo from "./pages/AddTodo";
import EditTodo from "./components/Todo/EditTodo";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/edit/:id" element={<EditTodo />} />
    
      <Route path="/add-todo" element={<AddTodo/>} />
    </Routes>
  );
};

export default AppRoutes;
