import { Form, Container, Row, Col, Button,Card } from "react-bootstrap";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate,Link } from "react-router-dom";
const express_url = "https://share-backend-7i3d.onrender.com";
const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const onSubmitForm = async (event) => {
    event.preventDefault();
    if (email === "") {
      setError("Email is required");
      
    } else if (password === "") {
      setError("Password is required");
      
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
    }else{
      const response = await fetch(`${express_url}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.jwtToken) {
        Cookies.set("jwtToken", data.jwtToken);
        navigate("/personal-details");
        
      } else {
        setError(data);
    }}
  };
  return (
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-Enter Password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </Form.Group>
            <Card.Text>{error}</Card.Text>
            <Button variant="primary" onClick={onSubmitForm}>
              Register
            </Button>
            <Card.Text>Already Have an account? <Link to="/login">Sign In</Link></Card.Text>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
