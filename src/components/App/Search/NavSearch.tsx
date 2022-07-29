import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

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
    if (window.scrollY < 300) {
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
      <InputGroup>
        {/* <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>  */}
        <Form.Control
          value={keyword}
          placeholder="Hey, what do you want to eat?"
          onChange={handleChange}
          style={{ width: "min(90vw, 500px)" }}
          type="search"
          size="lg"
        />
      </InputGroup>
    </Form>
  );
}

export default Search;
