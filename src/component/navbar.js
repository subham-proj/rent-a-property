import Button from "react-bootstrap/Button";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

import "../App.css";

export default function Header() {
  return (
    <Navbar className="navbar" expand="lg">
      <Container>
        <Navbar.Brand href="#">Estatery</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#action1">Rent</Nav.Link>
            <Nav.Link href="#action2">Buy</Nav.Link>
            <Nav.Link href="#action2">Sell</Nav.Link>
            <NavDropdown title="Manage Property" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Test</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Resources" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Test</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div className="d-flex">
            <Button className="header-buttons">Log in</Button>
            <Button className="header-buttons">Sign up</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
