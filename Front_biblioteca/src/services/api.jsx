
const API_URL = "http://localhost:8081"; // ajusta a tu backend

export async function login(email, password) {
  return fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(res => res.json());
}

export async function register(data) {
  return fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());
}

// libros
export async function getBooks() {
  return fetch(`${API_URL}/books`).then(res => res.json());
}

// préstamos
export async function getLoans(userId) {
  return fetch(`${API_URL}/loans/${userId}`).then(res => res.json());
}
