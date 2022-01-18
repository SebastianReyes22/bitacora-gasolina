import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

export default function Home() {
  //uri de api de axios
  const URI = process.env.REACT_APP_SERVER_URL;

  const [nomina, setNumNomina] = useState('');
  const [userName, setUserName] = useState('');
  const [userArea, setUserArea] = useState('');
  const [userImage, setUserImage] = useState('');

  const inputName = useRef(null);

  //Validacion de solo numeros en input nomina
  const handleChangeNomina = e => {
    e.preventDefault();
    setNumNomina(e.target.value.replace(/\D/g, ''));
  };

  //Peticion de axios a la api
  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append('option', 'selectEmpleado');
    formData.append('nomina', nomina);

    await Axios({
      method: 'POST',
      url: URI,
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then(response => {
        if (response.data.info === true) {
          setUserName(response.data.name);
          setUserImage(response.data.picture);
          setUserArea(response.data.deparment);
          inputName.current.focus();
          inputName.current.select();
        } else {
          alert(
            'Empleado no encontrado en la base de datos, comuniquese con el administrador',
          );
          inputName.current.focus();
          inputName.current.select();
        }
      })
      .catch(error => {
        console.log('Error en el servidor', error);
      });
  };

  //Evento de presionar tecla Enter
  const handleSubmitInput = e => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  useEffect(() => {
    inputName.current.focus();
  }, []);

  return (
    <Row className='component'>
      <Col className='col-sm-6 mt-5 '>
        <Card className='card-style-bitacora'>
          <Card.Header className='titleLogin'>
            {' '}
            ⛽ BITÁCORA DE GASOLINA ⛽{' '}
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm='2'>
                  Número de nomina
                </Form.Label>
                <Col sm='9'>
                  <Form.Control
                    ref={inputName}
                    type='text'
                    value={nomina}
                    onChange={handleChangeNomina.bind(this)}
                    onKeyDown={handleSubmitInput}
                    placeholder='12345'
                    maxLength='5'
                  />
                </Col>
                <Col sm='1'>
                  <Form.Control type='text' className='hiddenForm' />
                </Col>
              </Form.Group>
            </Form>
            <div className='d-grid gap-2'>
              <Button onClick={handleSubmit} variant='primary' size='lg'>
                Aceptar
              </Button>
            </div>
            <Form.Group as={Row} className='mt-5' controlId='formFechas'>
              <Col sm='8'>
                <Form.Label className='textUser' column>
                  {userName}
                </Form.Label>
              </Col>
              <Col sm='4'>
                <Form.Label className='textUser' column>
                  {userArea}
                </Form.Label>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mt-5' controlId='formFechas'>
              <Col>
                <img className='imageUser' src={userImage} alt='' />
              </Col>
            </Form.Group>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
