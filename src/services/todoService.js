import api from "./api";

// Named exports for each function





export const createTodo = async (todoData) => {
  try {
    const response = await api.post("/Todo/addTodo", todoData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating todo.");
  }
};


export const updateTodo = async (id, todoData) => {
  try {
    const response = await api.put(`/Todo/${id}`, todoData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error updating todo.");
  }
};


export const getTodoById = async (id) => {
  try {
    const response = await api.get(`/Todo/${id}`);  // API call to fetch todo by ID
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching todo.");
  }
};

export const getUserTodos = async () => {
    try { 
      const response = await api.get("/Todo/getAllTodos");
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error fetching todos.");
    }
  };



  

export const deleteTodo = async (todoId) => {
  try {
    const response = await api.delete(`/Todo/${todoId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error deleting todo.");
  }
};


export const handleStatusToggle = async (id) => {
  try {
    const response = await api.patch(`/Todo/toggleComplete/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error during todo status update .");
  }
};


export const getTodosByPriority = async (priority) => {
  try {
    const response = await api.get(`/Todo/byPriority/?priority=${priority}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error during fetching todo.");
  }
};

export const getTodosByCategory = async (category) => {
  try {
    const response = await api.get(`/Todo/byCategory/?category=${category}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error during fetching todo.");
  }
};

export const searchTodos = async (query) => {
  try {
    const response = await api.get(`/Todo/query?keyword=${query}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error searching todos.");
  }
};

