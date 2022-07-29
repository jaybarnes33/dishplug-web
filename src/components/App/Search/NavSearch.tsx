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

  // useEffect(() => {
  //   console.log(router.pathname);
  //   if (router.pathname == "/") {
  //     window.addEventListener("scroll", () => {
  //       if (window.scrollY < 300) {
  //         searchRef.current?.classList.add("d-none");
  //       } else {
  //         searchRef.current?.classList.remove("d-none");
  //       }
  //     });
  //   } else {
  //     searchRef.current?.classList.remove("d-none");
  //   }
  // }, [router]);

  return (
    <Form onSubmit={handleSubmit} ref={searchRef}>
      <InputGroup className="d-flex">
        {/* <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text> */}
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
