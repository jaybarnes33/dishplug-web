import foods from "@/data/foods";
import { FoodType } from "@/types";
import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

function Search() {
  const router = useRouter();
  const [keyword, setKeyword] = useState(String(router.query?.keyword) || "");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search/${keyword}`);
  };

  return (
    <Form className="d-flex gap-2" onSubmit={handleSubmit}>
      <Form.Control
        value={keyword}
        placeholder="Hey, what do you want to eat?"
        onChange={handleChange}
        style={{ width: "100%" }}
        size="lg"
      />

      <Button variant="dark" type="submit" size="sm">
        Search
      </Button>
    </Form>
  );
}

export default Search;
