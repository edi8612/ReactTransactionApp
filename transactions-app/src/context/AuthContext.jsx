// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiFetch } from "../lib/api";

const AuthCtx = createContext(null);

export default function AuthProvider({ children }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Use a truly PROTECTED endpoint you already have
  const STATUS_PATH = "/expenses"; // <- protected list endpoint

  async function check() {
    try {
      // optional: add a tiny limit so it’s cheap if your API supports it
      const res = await apiFetch(`${STATUS_PATH}`, { method: "GET" });
      // 200 => logged in; 401/403 => logged out
      setIsAuthed(res.ok === true);
    } catch {
      setIsAuthed(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { check(); }, []);                // initial load
  useEffect(() => { check(); }, [location.key]);    // after login redirect, etc.

  async function logout() {
    await apiFetch("/logout", { method: "POST" });
    setIsAuthed(false);
  }

  return (
    <AuthCtx.Provider value={{ isAuthed, loading, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() { return useContext(AuthCtx); }
