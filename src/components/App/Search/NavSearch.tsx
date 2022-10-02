import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState
} from "react";
import { Form } from "react-bootstrap";

function Search() {
  const router = useRouter();
  const searchRef = useRef<HTMLFormElement>(null);
  const [keyword, setKeyword] = useState(
    String(router.query?.keyword != undefined ? router.query?.keyword : "")
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?keyword=${keyword}`);
  };

  const handleScroll = () => {
    if (window.scrollY < 60) {
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
        value={keyword}
        placeholder="Search for food, drinks and more."
        onChange={handleChange}
        style={{
          width: "min(88vw, 500px)",
          marginLeft: "2vw",
          height: "2rem",
          backgroundColor: "rgba(249, 168, 77, 0.2)",
          color: "var(--dp-accent2)"
        }}
        className="search"
        type="search"
        size="lg"
      />
    </Form>
  );
}

export default Search;
