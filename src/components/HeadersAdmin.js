import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useUserAuth } from '../context/UserAuthContext';
import withPosco from '../images/withPosco.png';
import poscoLogo from '../images/poscoLogo.png';

const HeadersAdmin = () => {
  const { logOut } = useUserAuth();

  //Logout
  const handleLogOut = async () => {
    if (window.confirm('¿Realmente quieres cerrar sesión?')) {
      try {
        await logOut();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Navbar className='card-style'>
      <Container>
        <Navbar.Brand>
          <img className='footer-image' src={poscoLogo} />
        </Navbar.Brand>
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
                👤 Agregar empleado
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
            <Nav.Link href='./addUser'> 👤 Agregar Usuario</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              eventKey={2}
              onClick={handleLogOut}
              className='header-nav'>
              ❌ Cerrar Sesión
            </Nav.Link>
            <img alt='withposco' src={withPosco} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeadersAdmin;
