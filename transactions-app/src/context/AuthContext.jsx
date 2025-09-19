import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
const AuthCtx = createContext(null);

export default function AuthProvider({ children }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await apiFetch("/categories", { method: "GET" });
      setIsAuthed(res.ok); // if 401, ok=false
      setLoading(false);
    })();
  }, []);

  async function login(email, password) {
    const res = await apiFetch("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) setIsAuthed(true);
    return res; // caller will handle messages/errors
  }

  async function signup(email, password) {
    const res = await apiFetch("/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) setIsAuthed(true);
    return res;
  }

  async function logout() {
    await apiFetch("/logout", { method: "POST" }); // your API has this
    setIsAuthed(false);
  }

  const value = { isAuthed, loading, login, signup, logout, setIsAuthed };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}
