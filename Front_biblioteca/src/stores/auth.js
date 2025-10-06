/* src/stores/auth.js */
import { createSignal } from "solid-js";
import api from "../services/api";

const [user, setUser] = createSignal(null);

async function register(data) {
  const res = await api.post("/usuarios/", data);
  setUser(res.data); // guardamos el usuario creado
  return res.data;
}

// "Login" simulado: busca el usuario por ID
async function login(userId) {
  const res = await api.get(`/usuarios/${userId}/`);
  setUser(res.data);
  return res.data;
}

function logout() {
  setUser(null);
}

export default {
  user,
  register,
  login,
  logout,
};

