// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiFetch } from "../lib/api";

const AuthCtx = createContext(null);

export default function AuthProvider({ children }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Use a truly PROTECTED endpoint now that GET /expenses requires auth
  const STATUS_PATH = "/auth/status";

  async function check() {
    try {
      const res = await apiFetch(STATUS_PATH, { method: "GET" });
      // 200 => logged in; 401/403 => logged out
      setIsAuthed(res.ok === true);
    } catch {
      setIsAuthed(false);
    } finally {
      setLoading(false);
    }
  }

  // initial check
  useEffect(() => { check(); }, []);
  // re-check after navigation (e.g., after login redirect, logout)
  useEffect(() => { check(); }, [location.key]);

  async function login(email, password) {
    const res = await apiFetch("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) setIsAuthed(true);   // instant UI update
    return res;
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
    await apiFetch("/logout", { method: "POST" });
    setIsAuthed(false);
  }

  const value = { isAuthed, loading, login, signup, logout, setIsAuthed };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}
