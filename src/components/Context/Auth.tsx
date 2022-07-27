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
  user: User | null;
}

const AuthContext = createContext<IContextProps | null>(null);

const AuthProvider = ({ children }: IProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const anonymous = localStorage.getItem("anonymous");

    if (!anonymous) {
      setPersistence(auth, browserLocalPersistence).then(() => {
        signInAnonymously(auth).then(({ user }) => {
          setUser(user);
          localStorage.setItem("anonymous", user.uid);
        });
      });
    }
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
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
