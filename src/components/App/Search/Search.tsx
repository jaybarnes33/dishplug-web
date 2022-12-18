import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";

function Search() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [keyword, setKeyword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?keyword=${keyword}`);
  };

  const handleScroll = () => {
    if (inputRef.current && buttonRef.current) {
      if (window.scrollY >= 60) {
        inputRef.current.style.width = "100%";
        buttonRef.current.style.transform = "translateX(100%)";
      } else {
        inputRef.current.style.width = "calc(100% - 62px - 8px)";
        buttonRef.current.style.transform = "initial";
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Form
      className="d-flex gap-2"
      onSubmit={handleSubmit}
      style={{
        zIndex: 1,
        padding: "5px 0 8px",
        overflowX: "hidden"
      }}
    >
      <Form.Control
        value={keyword}
        ref={inputRef}
        placeholder="Search for food, drinks and more"
        onChange={handleChange}
        style={{
          width: "calc(100% - 62px - 8px)", // subtract the width of the button and the gap
          border: "none",
          backgroundColor: "#eee",
          color: "#1a1a1a",
          zIndex: 100,
          transition: "width ease-out 120ms"
        }}
        size="lg"
        type="search"
        className="search"
      />

      <Button
        ref={buttonRef}
        style={{
          width: 62,
          height: "calc(100% - 13px)", // minus spacing from container
          position: "absolute",
          right: 0,
          transition: "transform ease-out 120ms"
        }}
        variant="dark"
        type="submit"
        size="sm"
      >
        Search
      </Button>
    </Form>
  );
}

export default Search;
