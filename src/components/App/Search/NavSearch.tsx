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
  const [keyword, setKeyword] = useState(
    String(router.query?.keyword != undefined ? router.query?.keyword : "")
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const searchRef = useRef<HTMLFormElement>(null);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?keyword=${keyword}`);
  };

  useEffect(() => {
    console.log(router.pathname);
    if (router.pathname == "/") {
      window.addEventListener("scroll", () => {
        if (window.scrollY < 300) {
          searchRef.current?.classList.add("d-none");
        } else {
          searchRef.current?.classList.remove("d-none");
        }
      });
    } else {
      searchRef.current?.classList.remove("d-none");
    }
  }, [router]);

  return (
    <Form
      className={`${router.pathname == "/" ? "d-none" : "d-block"}`}
      onSubmit={handleSubmit}
      ref={searchRef}
    >
      <InputGroup>
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          value={keyword}
          placeholder="Hey, what do you want to eat?"
          onChange={handleChange}
          style={{ width: 500 }}
          type="search"
          size="lg"
        />
      </InputGroup>
    </Form>
  );
}

export default Search;
