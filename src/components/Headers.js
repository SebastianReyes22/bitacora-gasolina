import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

export default function Headers() {
  return (
    <Navbar
      sticky="top"
      collapseOnSelect
      expand="lg"
      variant="dark"
      className="card-style"
    >
      <Container>
        <Navbar.Brand href="/dashboard"> ⛽ Bitácoras Gasolina</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard"> 🏠 Inicio</Nav.Link>
            <NavDropdown title=" 🔧 Herramientas" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/dashboard">
                {" "}
                📁 Generar Reporte
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/addUser">
                {" "}
                👤 Agregar usuario
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                {" "}
                ☠️ Eliminar usuario
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/home">
                {" "}
                ⛽ Sistema Caseta
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} href="/login">
              ❌ Cerrar Sesión
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
