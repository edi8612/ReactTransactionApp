// src/lib/endpoints.js
export const API = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    logout: "/auth/logout",
    status: "/auth/status",
  },
  tx: {
    list: "/transaction",
    one: (id) => `/transaction/${id}`,
    create: "/transaction",
    update: (id) => `/transaction/${id}`,
    delete: (id) => `/transaction/${id}`,
  },
  categories: "/category",
};
