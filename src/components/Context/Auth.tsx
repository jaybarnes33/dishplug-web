import {
  browserLocalPersistence,
  onAuthStateChanged,
  onIdTokenChanged,
  setPersistence,
  signInAnonymously,
  signInWithCustomToken,
  User
} from "firebase/auth";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
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

  const createAnon = useCallback(() => {
    setPersistence(auth, browserLocalPersistence).then(() => {
      signInAnonymously(auth).then(({ user }) => {
        setUser(user);
        user.getIdToken().then(setToken);
        localStorage.setItem("anonymous", user.uid);
      });
    });
  }, []);

  const getAnon = useCallback(() => {
    const anonymousUid = localStorage.getItem("anonymous");

    fetch(`/api/users/anon?uid=${anonymousUid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        const token = data.token;
        if (!token) throw new Error("failed to get anon");

        signInWithCustomToken(auth, token);
      })
      .catch(createAnon);
  }, [createAnon]);

  useEffect(() => {
    const anonymousUid = localStorage.getItem("anonymous");
    if (!anonymousUid) createAnon();
  }, [createAnon]);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      console.log(user);

      if (user) {
        setUser(user);
        user.getIdToken().then(setToken);
        setIsAuthenticated(
          Boolean(!user.isAnonymous && user.providerData.length)
        );
      } else {
        getAnon();
      }
    });
  }, [getAnon]);

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
