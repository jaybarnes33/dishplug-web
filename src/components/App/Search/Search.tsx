import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";

function Search() {
  const router = useRouter();
  const searchRef = useRef<HTMLFormElement>(null);
  const [keyword, setKeyword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?keyword=${keyword}`);
  };

  const handleScroll = () => {
    if (window.scrollY >= 60) {
      searchRef.current?.classList.add("d-none");
    } else {
      searchRef.current?.classList.remove("d-none");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Form className="d-flex gap-2" onSubmit={handleSubmit} ref={searchRef}>
      <Form.Control
        value={keyword}
        placeholder="Search for food, drinks and more"
        onChange={handleChange}
        style={{
          width: "100%",
          border: "none",
          backgroundColor: "rgba(249, 168, 77, 0.2)",
          color: "var(--dp-accent2)"
        }}
        size="lg"
        type="search"
        className="search"
      />

      <Button variant="dark" type="submit" size="sm">
        Search
      </Button>
    </Form>
  );
}

export default Search;
