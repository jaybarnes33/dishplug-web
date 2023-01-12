import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearch } from "@/components/Context/Search";

export const useKeyword = () => {
  const { push } = useRouter();
  const { updateKeyword } = useSearch();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const persistingKeyword = searchParams.get("search");

    if (persistingKeyword && typeof persistingKeyword === "string") {
      setKeyword(persistingKeyword);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setKeyword(value);
    updateKeyword(value);
    push(`/search?keyword=${value}`);
  };

  return { keyword, handleChange };
};
