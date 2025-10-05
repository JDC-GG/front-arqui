// src/components/ProtectedRoute.jsx
import { onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import auth from "../stores/auth";

export default function ProtectedRoute(props) {
  const navigate = useNavigate();
  onMount(() => {
    if (!auth.isLogged()) navigate("/login");
  });
  return props.children;
}
