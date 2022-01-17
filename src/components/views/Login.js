import React, { useState, useEffect, useRef } from 'react';
import { useUserAuth } from '../../context/UserAuthContext';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import '../../styles/styles.css';

const Login = () => {
  const URI = process.env.REACT_APP_SERVER_URL;

  const [userName, setUserName] = useState('');
  const [passwordUser, setPasswordUser] = useState('');
  const inputName = useRef(null);

  const navigate = useNavigate();

  const { logIn } = useUserAuth();

  const handleSubmit = async () => {
    try {
      await logIn(userName, passwordUser);
      navigate('/bitacoras');
    } catch (err) {
      alert('Error, algo salió mal');
    }
  };

  {
    /* 
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
          window.location = './bitacoras';
        }
      })
      .catch(error => {
        console.log('Error en el servidor', error);
      });
  };
*/
  }

  const handleSubmitInput = e => {
    //e.preventDefault();
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  useEffect(() => {
    inputName.current.focus();
  }, []);

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
                  ref={inputName}
                  type='text'
                  placeholder='Nombre de usuario'
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label> 🔒 Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
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
    </Row>
  );
};

export default Login;
