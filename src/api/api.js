import axios from "axios";

const API_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const loginUser = async (username, password) => {
  const response = await api.post("/auth/login", { username, password });

  localStorage.setItem("token", response.data.token);
  setAuthToken(response.data.token);

  return response.data.token;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  setAuthToken(null);
};

export const getTodosApi = async () => {
  const response = await api.get("/todos");
  return response.data;
};

export const addTodoApi = async (title) => {
  const response = await api.post("/todos", { title });
  return response.data;
};

export const updateTodoApi = async (id, completed) => {
  const response = await api.patch(`/todos/${id}`, { completed });
  return response.data;
};

export const updateTodoTitle = async (id, title) => {
  const response = await api.post(`/todos/${id}`, { title });
  return response.data;
};

export const deleteTodoApi = async (id) => {
  await api.delete(`/todos/${id}`);
};

export default api;
