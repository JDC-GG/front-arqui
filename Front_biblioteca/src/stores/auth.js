// src/stores/auth.js
import { createSignal } from "solid-js";

const [user, setUser] = createSignal(null);

// Usuarios mock en memoria
const mockUsers = [
  { id: 1, nombre: "Juan Pérez", correo: "juan@biblioteca.com", password: "123" },
  { id: 2, nombre: "María García", correo: "maria@biblioteca.com", password: "456" },
];

let nextUserId = 3;

async function register(data) {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Crear nuevo usuario
  const newUser = {
    id: nextUserId++,
    nombre: data.nombre,
    correo: data.correo,
    password: data.password
  };
  
  mockUsers.push(newUser);
  setUser(newUser);
  
  return newUser;
}

async function login(userId) {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const foundUser = mockUsers.find(u => u.id === parseInt(userId));
  
  if (!foundUser) {
    throw new Error("Usuario no encontrado");
  }
  
  setUser(foundUser);
  return foundUser;
}

function logout() {
  setUser(null);
}

export default {
  get user() {
    return user();
  },
  register,
  login,
  logout,
};