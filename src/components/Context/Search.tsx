import { useDebounce } from "@/hooks/useDebounce";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";

interface IProviderProps {
  children: React.ReactNode;
}

interface IContextProps {
  keyword: string;
  debouncedKeyword: string;
  updateKeyword: (text: string) => void;
}

const SearchContext = createContext<IContextProps | null>(null);

const SearchProvider = ({ children }: IProviderProps) => {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword);

  const updateKeyword = useCallback((text: string) => {
    setKeyword(text);
  }, []);

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    const text = url.get("keyword");

    setKeyword(text || "");
  }, []);

  return (
    <SearchContext.Provider
      value={{ keyword, debouncedKeyword, updateKeyword }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("`useSearch` was called without a Provider");
  }

  return context;
};

export default SearchProvider;
