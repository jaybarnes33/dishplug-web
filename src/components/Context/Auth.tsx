import {
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInAnonymously,
  User
} from "firebase/auth";
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
    const anonymous = localStorage.getItem("anonymous");

    if (!anonymous) {
      setPersistence(auth, browserLocalPersistence).then(() => {
        signInAnonymously(auth).then(({ user }) => {
          setUser(user);
          user.getIdToken().then(setToken);
          localStorage.setItem("anonymous", user.uid);
        });
      });
    }
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
        user.getIdToken().then(setToken);
        if (!user.isAnonymous) setIsAuthenticated(true);
      }
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
