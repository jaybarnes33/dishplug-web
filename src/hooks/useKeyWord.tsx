import { useEffect, useState } from "react";

export const useKeyword = () => {
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    const text = url.get("keyword");
    setKeyword(text || "");
  }, []);

  return keyword;
};
