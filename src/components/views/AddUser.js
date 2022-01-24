import React, { useState } from 'react';
import Headers from '../Headers';
import HeadersAdmin from '../HeadersAdmin';
import { useUserAuth } from '../../context/UserAuthContext';
import { Form, Row, Col, Card, Button } from 'react-bootstrap';

export default function AddUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const { sigUp, userRol, user } = useUserAuth();

  console.log(userRol);
  //Creación de usuario en firebase
  const handleSubmit = async () => {
    try {
      await sigUp(email, password, role);
      alert('Usuario generado correctamente');
      handleRefresh();
    } catch (err) {
      alert(err);
    }
  };

  //Funcion que limpa todos los imput a su valor por defecto
  const handleRefresh = () => {
    setEmail('');
    setPassword('');
    setRole('');
    console.log(user);
  };

  const auth = () => {
    return (
      <>
        <HeadersAdmin />
        <Row className='component'>
          <Col className='mt-3 col-sm-10'>
            <Card className='card-style-bitacora'>
              <Card.Header className='titleLogin'>Agregar usuario</Card.Header>
              <Card.Body>
                <Form className=''>
                  <Form.Group as={Row} className='mb-3' controlId='formFechas'>
                    <Col sm='4'>
                      <Form.Label column>Correo</Form.Label>
                      <Form.Control
                        sm='6'
                        type='email'
                        placeholder='nombre.apellido@poscomppc.com'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </Col>
                    <Col sm='4'>
                      <Form.Label column>Contraseña</Form.Label>
                      <Form.Control
                        sm='6'
                        type='password'
                        placeholder='*******************'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </Col>
                    <Col sm='4'>
                      <Form.Label column>Tipo de usuario</Form.Label>
                      <Form.Select
                        value={role}
                        onChange={e => setRole(e.target.value)}
                        aria-label='Default select example'>
                        <option value=''>Seleccionar tipo de usuario</option>
                        <option value='1'>Administrador</option>
                        <option value='0'>Usuario</option>
                      </Form.Select>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className='mb-3' controlId='formFechas'>
                    <Col sm='4' />
                    <Col sm='4' />
                    <Col sm='2'>
                      <div className='d-grid gap-2'>
                        <Button
                          className='mt-4'
                          variant='primary'
                          size='lg'
                          onClick={handleSubmit}>
                          Guardar
                        </Button>
                      </div>
                    </Col>
                    <Col sm='2'>
                      <div className='d-grid gap-2'>
                        <Button
                          className='mt-4'
                          variant='danger'
                          size='lg'
                          onClick={handleRefresh}>
                          Limpiar
                        </Button>
                      </div>
                    </Col>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    );
  };

  const unAuth = () => {
    return (
      <>
        <Headers />
        <h1>Usuario no autorizado</h1>;
      </>
    );
  };

  return userRol.rol == '1' ? auth() : unAuth();
}
