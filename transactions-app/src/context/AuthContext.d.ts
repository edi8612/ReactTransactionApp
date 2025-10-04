import type React from "react";

export interface AuthContextValue {
  isAuthed: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  signup: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  setIsAuthed: React.Dispatch<React.SetStateAction<boolean>>;
}

declare const AuthProvider: React.FC<React.PropsWithChildren<{}>>;
export default AuthProvider;

export function useAuth(): AuthContextValue;
