import { Navbar, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


const Header = () => {
  const navigate = useNavigate();
  const logout = () => {
    Cookies.remove("jwtToken");
    navigate("/login");
  };


  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>JaiHo</Navbar.Brand>
        <Button variant="primary" onClick={logout}>Logout</Button>
      </Container>
    </Navbar>
  );
};

export default Header;
