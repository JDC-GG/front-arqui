/* src/stores/auth.js */
import { createSignal } from "solid-js";

const [user, setUser] = createSignal(null);

export default {
user,
setUser,
};
