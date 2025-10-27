import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import { API } from "../lib/endpoints";

const AuthCtx = createContext(null);

// Helper function to check if auth flag cookie exists
function hasAuthCookie() {
  return document.cookie.split(';').some(c => c.trim().startsWith('isAuthenticated='));
}

export default function AuthProvider({ children }) {
  const [isAuthed, setIsAuthed] = useState(() => hasAuthCookie());
 

  
  useEffect(() => {
    const interval = setInterval(() => {
      const hasAuth = hasAuthCookie();
      if (hasAuth !== isAuthed) {
        setIsAuthed(hasAuth);
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [isAuthed]);

  // Listen for 401 unauthorized events from API calls
  useEffect(() => {
    const handleUnauthorized = () => {
      console.log("401 detected - setting auth to false");
      setIsAuthed(false);
    };
    
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    
    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, []);

  async function login(email, password) {
    try {
      const res = await apiFetch(API.auth.login, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      
      return res;
    } catch (error) {
      return { ok: false, error };
    }
  }

  async function signup(email, password) {
    try {
      const res = await apiFetch(API.auth.signup, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      
      if (res.ok) {
        setTimeout(() => setIsAuthed(hasAuthCookie()), 100);
      }
      
      return res;
    } catch (error) {
      return { ok: false, error };
    }
  }

  async function logout() {
    try {
      await apiFetch(API.auth.logout, { method: "POST" });
      setTimeout(() => setIsAuthed(hasAuthCookie()), 100);
    } catch (error) {
      console.error("Logout error:", error);
    }
  }
  //loading,
  const value = { isAuthed,  login, signup, logout, setIsAuthed };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}

