// src/stores/auth.js
import { createSignal } from "solid-js";

const [user, setUser] = createSignal(JSON.parse(localStorage.getItem("user")) || null);

// Usuarios mock en memoria
const mockUsers = [
  { id: 1, nombre: "Juan Pérez", correo: "juan.sebastian@gmail.com", password: "123" },
  { id: 2, nombre: "María García", correo: "maria@biblioteca.com", password: "456" },
];

let nextUserId = 3;

async function register({ nombre, correo, password }) {
  await new Promise(resolve => setTimeout(resolve, 500));

  // Validar si ya existe el correo
  if (mockUsers.find(u => u.correo === correo)) {
    throw new Error("El correo ya está registrado");
  }

  const newUser = { id: nextUserId++, nombre, correo, password };
  mockUsers.push(newUser);
  setUser(newUser);
  localStorage.setItem("user", JSON.stringify(newUser));

  return newUser;
}

async function login({ correo, password }) {
  await new Promise(resolve => setTimeout(resolve, 500));

  // Buscar usuario por correo y contraseña
  const foundUser = mockUsers.find(u => u.correo === correo && u.password === password);
  if (!foundUser) throw new Error("Correo o contraseña incorrectos");

  setUser(foundUser);
  localStorage.setItem("user", JSON.stringify(foundUser));

  return foundUser;
}

function logout() {
  setUser(null);
  localStorage.removeItem("user");
}

export default {
  get user() {
    return user();
  },
  register,
  login,
  logout,
};
