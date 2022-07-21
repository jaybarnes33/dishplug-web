import React from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
function Search() {
  return (
    <Form className="d-flex gap-2">
      <InputGroup size="lg">
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <Form.Control placeholder="Hey, what do you want to eat?" />
      </InputGroup>
    </Form>
  );
}

export default Search;
