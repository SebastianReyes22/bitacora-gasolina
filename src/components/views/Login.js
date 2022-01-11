import React, { useState } from 'react';
import Axios from 'axios';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import '../../styles/styles.css';

export default function Login() {
  const URI = process.env.REACT_APP_SERVER_URL;

  const [userName, setUserName] = useState('');
  const [passwordUser, setPasswordUser] = useState('');

  const handleChangeUser = e => {
    e.preventDefault();
    setUserName(e.target.value);
  };

  const handleChangePassword = e => {
    e.preventDefault();
    setPasswordUser(e.target.value);
  };

  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append('option', 'loginQuery');
    formData.append('userName', userName);
    formData.append('passwordUser', passwordUser);

    await Axios({
      method: 'POST',
      url: URI,
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then(response => {
        if (!response.data.login) {
          alert('Usuario no registrado, comuniquese con el administrador');
        } else {
          console.log(response.data);
          window.location = '/bitacora-gasolina';
        }
      })
      .catch(error => {
        console.log('Error en el servidor', error);
      });
  };

  return (
    <Row className='App-header-home'>
      <Col className='col-sm-4 mt-5'>
        <Card className='card-style'>
          <Card.Header className='titleLogin'>Inicio de sesión</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label> 👤 Usuario</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Nombre de usuario'
                  value={userName}
                  onChange={handleChangeUser}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label> 🔒 Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  value={passwordUser}
                  onChange={handleChangePassword}
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
    </Row>
  );
}
