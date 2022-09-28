import { Container, Nav, Navbar } from 'react-bootstrap';

export const NavCaseta = () => {
  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand>POSCO MPPC</Navbar.Brand>
        <Nav className='me-auto'>
          <Nav.Link href='./inicio'>Agregar Registro</Nav.Link>
          <Nav.Link href='./delete-log'>Colsultar/Borrar Registro</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
