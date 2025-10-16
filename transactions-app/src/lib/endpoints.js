// src/lib/endpoints.js
export const API = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    logout: "/auth/logout", // adjust if your backend uses a different path
    status: "/auth/status", // if you exposed it; otherwise remove & see notes below
  },
  tx: {
    list: "/transaction",
    one: (id) => `/transaction/${id}`,
    create: "/transaction",
    update: (id) => `/transaction/${id}`,
    delete: (id) => `/transaction/${id}`,
  },
  categories: "/category", // if this still exists
};
