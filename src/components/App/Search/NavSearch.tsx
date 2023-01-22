import { useKeyword } from "@/hooks/useKeyword";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { Form } from "react-bootstrap";

function Search() {
  const router = useRouter();
  const searchRef = useRef<HTMLFormElement>(null);
  const { handleChange } = useKeyword();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleScroll = () => {
    if (window.scrollY < 81) {
      searchRef.current?.classList.add("d-none");
    } else {
      searchRef.current?.classList.remove("d-none");
    }
  };

  useEffect(() => {
    if (router.pathname === "/") {
      searchRef.current?.classList.add("d-none");
      window.addEventListener("scroll", handleScroll);
    } else {
      searchRef.current?.classList.remove("d-none");
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [router.pathname]);

  return (
    <Form onSubmit={handleSubmit} ref={searchRef} className="d-none">
      <Form.Control
        placeholder="Search for food, drinks and more."
        onChange={handleChange}
        style={{
          width: "min(88vw, 500px)",
          marginLeft: "2vw",
          height: "2rem",
          backgroundColor: "#eee",
          color: "#1a1a1a"
        }}
        className="search"
        type="search"
        size="lg"
      />
    </Form>
  );
}

export default Search;
