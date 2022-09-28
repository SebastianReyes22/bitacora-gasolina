import React, { useState, useEffect, useRef } from 'react';
import { useUserAuth } from '../../context/UserAuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import '../../styles/styles.css';

export const Login = () => {
  const [userName, setUserName] = useState('');
  const [passwordUser, setPasswordUser] = useState('');
  const inputName = useRef(null);

  const navigate = useNavigate();

  const { logIn } = useUserAuth();

  let email = '';

  //Login
  const handleSubmit = async () => {
    email = userName + '@poscomppc.com';
    try {
      await logIn(email, passwordUser);
      navigate('/reportes');
    } catch (err) {
      alert('Error, algo salió mal');
    }
  };

  //Evento cuando se presiona la tecla Enter
  const handleSubmitInput = e => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  useEffect(() => {
    inputName.current.focus();
  }, []);

  return (
    <Col className='component'>
      <Col className='col-sm-4 mt-5'>
        <Card className='card-style-login'>
          <Card.Header className='titleLogin'>Inicio de sesión</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label> 👤 Usuario</Form.Label>
                <Form.Control
                  ref={inputName}
                  type='email'
                  placeholder='Nombre de usuario'
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label> 🔒 Contraseña</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='*****************'
                  value={passwordUser}
                  onChange={e => setPasswordUser(e.target.value)}
                  onKeyDown={handleSubmitInput}
                />
              </Form.Group>
              <div className='d-grid gap-2'>
                <Button onClick={handleSubmit} variant='primary' size='lg'>
                  Ingresar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Col>
  );
};
