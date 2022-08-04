import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase/client";

interface IProviderProps {
  children: React.ReactNode;
}

interface IContextProps {
  token: string;
  user: User | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<IContextProps | null>(null);

const AuthProvider = ({ children }: IProviderProps) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setIsAuthenticated(true);
        user.getIdToken().then(setToken);
      } else {
        setToken("");
        setIsAuthenticated(false);
      }

      setUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("`useAuth` was called without a Provider");
  }

  return context;
};

export default AuthProvider;
