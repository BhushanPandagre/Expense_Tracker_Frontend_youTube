import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { api } from "../api";

const AuthContext = createContext(null);
const KEY = "expense-auth";

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(load); // { token, user } ya null

  function save(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
    setAuth(data);
  }

  async function login(email, password) {
    save(
      await api("/auth/login", {
        method: "POST",
        body: { email, password },
      }),
    );
  }

  async function register(name, email, password) {
    save(
      await api("/auth/register", {
        method: "POST",
        body: { name, email, password },
      }),
    );
  }

  const logout = useCallback(() => {
    localStorage.removeItem(KEY);
    setAuth(null);
  }, []);

  const value = {
    user: auth?.user,
    token: auth?.token,
    login,
    register,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
