import {
  Form,
  Container,
  Row,
  Col,
  Button,
  Card,
  Dropdown,
} from "react-bootstrap";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const express_url = "https://share-backend-7i3d.onrender.com";

const caste_category = {
  OC: [
    "Brahmin",
    "Kshatriya",
    "Kamma",
    "Kapu",
    "Reddy",
    "Vyshya",
    "Velama Dora",
    "Marwadi",
    "Jain",
    "Sindh",
    "Others",
  ],
  BC: ["BC A", "BC B", "BC C", "BC D"],
};

const PersonalDetails = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [gothram, setGothram] = useState("");
  const [caste, setCaste] = useState("");
  const [subCaste, setSubCaste] = useState("");
  const [casteType, setCasteType] = useState("");
  const [error, setError] = useState("");
  console.log(name, surname, gothram, caste, caste_category[caste]);
  const navigate = useNavigate();
  const onSubmitForm = async (event) => {
    event.preventDefault();
    if (name === "") {
      setError("Name is required");
    } else if (surname === "") {
      setError("Surname is required");
    } else if (gothram === "") {
      setError("Gothram is required");
    } else {
      const response = await fetch(`${express_url}/api/members/mydetails`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("jwtToken")}`,
        },
        body: JSON.stringify({ name, surname, gothram }),
      });
      const data = await response.json();
      if (data.jwtToken) {
        Cookies.set("jwtToken", data.jwtToken);
        navigate("/");
      } else {
        setError(data);
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={onSubmitForm}>
            <Row>
            <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Your Suname"
                value={surname}
                onChange={(event) => setSurname(event.target.value)}
              />
            </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Gothram</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Your Gothram"
                value={gothram}
                onChange={(event) => setGothram(event.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3 col-6 col-md-6"
              controlId="exampleForm.ControlInput2"
            >
              <Form.Label>Caste Category</Form.Label>

              <Form.Select
                aria-label="Default select example"
                value={caste}
                onChange={(event) => setCaste(event.target.value)}
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="OC">OC</option>
                <option value="BC">BC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </Form.Select>
            </Form.Group>

            {caste in caste_category ? (
              <Form.Group
                className="mb-3 col-6 col-md-6"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label>Caste Sub Category</Form.Label>

                <Form.Select
                  aria-label="Default select example"
                  value={subCaste}s
                  onChange={(event) => setSubCaste(event.target.value)}
                >
                  {caste_category[caste].map((caste) => (
                    <option value={caste}>{caste}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            ) : (
              ""
            )}

            {caste !== "OC" ? (
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Caste Category Type</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Category Type"
                  value={casteType}
                  onChange={(event) => setCasteType(event.target.value)}
                />
              </Form.Group>
            ) : (
              ""
            )}

<Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter Your Category Type"
                  value={casteType}
                  onChange={(event) => setCasteType(event.target.value)}
                />
              </Form.Group>

            <Card.Text>{error}</Card.Text>
            <Button variant="primary" onClick={onSubmitForm}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PersonalDetails;
