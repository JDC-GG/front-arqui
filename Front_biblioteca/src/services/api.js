// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // backend Django
});

// ----------------- Usuarios -----------------
export const registerUser = (data) => api.post("/usuarios/", data);
export const loginUser = (id) => api.get(`/usuarios/${id}/`); 


// ----------------- Libros -----------------
export const getLibros = () => api.get("/libros/");
export const getLibro = (id) => api.get(`/libros/${id}/`);

// ----------------- Préstamos -----------------
export const getPrestamos = () => api.get("/prestamos/");
export const createPrestamo = (data) => api.post("/prestamos/", data);
export const returnPrestamo = (id) => api.post(`/prestamos/${id}/return/`);

// Exportar axios por si necesitas usarlo crudo
export default api;
