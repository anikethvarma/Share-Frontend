import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import Cookies from "js-cookie";
import {useNavigate, Link, Navigate} from "react-router-dom";
const express_url = "https://share-backend-7i3d.onrender.com";
const Login = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmitForm = async (event) => {
    event.preventDefault();
    if (email === "") {
      setError("Email is required");
      
    } else if (password === "") {
      setError("Password is required");
      
    }else{
      const response = await fetch(`${express_url}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.jwtToken) {
        Cookies.set("jwtToken", data.jwtToken);
        navigate("/");
      } else {
        setError(data);
    }}
  };
  return (
    (Cookies.get("jwtToken") !== undefined) ? <Navigate to="/" /> :
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={onSubmitForm}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email Address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>
            <p>{error}</p>
            <Button variant="primary" onClick={onSubmitForm}>
              Login
            </Button>
            <p>Don't Have an account? <Link to="/register">Sign up</Link></p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;