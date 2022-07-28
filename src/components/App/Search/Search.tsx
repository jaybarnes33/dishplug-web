import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";

function Search() {
  const router = useRouter();

  const [keyword, setKeyword] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?keyword=${keyword.toLowerCase()}`);
  };

  const searchRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 300) {
        searchRef.current?.classList.add("d-none");
      } else {
        searchRef.current?.classList.remove("d-none");
      }
    });
  });
  return (
    <Form className="d-flex gap-2" onSubmit={handleSubmit} ref={searchRef}>
      <Form.Control
        value={keyword}
        placeholder="Hey, what do you want to eat?"
        onChange={handleChange}
        style={{ width: "100%" }}
        size="lg"
        type="search"
      />

      <Button variant="dark" type="submit" size="sm">
        Search
      </Button>
    </Form>
  );
}

export default Search;
