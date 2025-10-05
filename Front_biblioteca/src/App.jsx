// src/App.jsx
/* src/App.jsx */
import { Router, Routes, Route, Navigate } from "@solidjs/router";
import Login from "./components/login";
import Register from "./components/Register";
import Menu from "./components/Menu";
import BooksList from "./components/BooksList";
import LoansList from "./components/LoansList";
import LoanHistory from "./components/LoanHistory";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" component={() => <Navigate href="/login" />} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/menu" component={Menu} />
        <Route path="/books" component={BooksList} />
        <Route path="/loans" component={LoansList} />
        <Route path="/history" component={LoanHistory} />
      </Routes>
    </Router>
  );
}
