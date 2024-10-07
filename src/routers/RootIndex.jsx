import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, Outlet } from "react-router-dom";


export function RootIndex() {
  return (
    <Container>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/home">Neko-Chan</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/bus-info">
                Bus Info
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/bus-services">
                Bus Services
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/first-map">
                First Map
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/road-camera">
                Road Camera
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Nothing yet
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
               Nothing yet
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
      <Outlet />
    </Container>
  );
}

