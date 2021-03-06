import React, { useState } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { authServices } from "../../../services";

function ForgottenAcc(props) {
  const emailFA = useFormInput("");
  const [stateFA, setStateFA] = useState("");

  function handleClick() {
    var data = {
      emailFA: emailFA.value
    };
    authServices.forgottenacc(data).then(res => {
      setStateFA(res.data.message);
    });
  }

  return (
    <div>
      <Container>
        <Row style={{ marginTop: 50 }}>
          <Col />
          <Col>
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="emailFA" {...emailFA}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
              </Form.Row>
              <span>{stateFA}</span>
              <Button variant="primary" id="fa-btn" onClick={handleClick}>
                Submit
              </Button>
            </Form>
          </Col>
          <Col />
        </Row>
      </Container>
    </div>
  );
}

function useFormInput(initial) {
  const [value, setValue] = useState(initial);

  function handleChange(e) {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  };
}

export default ForgottenAcc;
