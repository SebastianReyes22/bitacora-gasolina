import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'

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
        <Navbar.Brand href="/bitacora-gasolina"> ⛽ Bitácoras Gasolina</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/bitacora-gasolina"> 🏠 Inicio</Nav.Link>
            <NavDropdown title=" 🔧 Herramientas" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/reportes">
                {' '}
                📁 Generar Reporte
              </NavDropdown.Item>
              <NavDropdown.Item href="/bitacora-gasolina">
                {' '}
                📁 Generar Bitácora
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/addUser">
                {' '}
                👤 Agregar usuario
              </NavDropdown.Item>
              <NavDropdown.Item href="/eliminarUsuario">
                {' '}
                ☠️ Eliminar usuario
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/home">
                {' '}
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
  )
}
