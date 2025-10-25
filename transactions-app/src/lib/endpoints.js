export const API = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    logout: "/auth/logout",
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
