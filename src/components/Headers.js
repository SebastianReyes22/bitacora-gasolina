import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useUserAuth } from '../context/UserAuthContext';

const Headers = () => {
  const { logOut } = useUserAuth();
  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Navbar
      sticky='top'
      collapseOnSelect
      expand='lg'
      variant='dark'
      className='card-style'>
      <Container>
        <Navbar.Brand href='./bitacoras'> ⛽ Bitácoras Gasolina</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='./bitacoras'> 🏠 Inicio</Nav.Link>
            <NavDropdown title=' 🔧 Herramientas' id='collasible-nav-dropdown'>
              <NavDropdown.Item href='./reportes'>
                {' '}
                📁 Generar Reporte
              </NavDropdown.Item>
              <NavDropdown.Item href='./bitacoras'>
                {' '}
                📁 Generar Bitácora
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='./agregarUsuario'>
                {' '}
                👤 Agregar usuario
              </NavDropdown.Item>
              <NavDropdown.Item href='./eliminarUsuario'>
                {' '}
                ☠️ Eliminar usuario
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='./inicio'>
                {' '}
                ⛽ Sistema Caseta
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} onClick={handleLogOut}>
              ❌ Cerrar Sesión
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Headers;
