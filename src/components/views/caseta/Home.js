import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import { Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';

export const Home = () => {
  //uri de api de axios
  const URI = process.env.REACT_APP_SERVER_URL;

  // Datepicker
  const [startDate, setStartDate] = useState(new Date());
  registerLocale('es', es);
  //Funcion que cambia el valor de lafecha de inicio
  const handleChangeStartDate = date => {
    setStartDate(date);
  };

  const [nomina, setNumNomina] = useState('');
  const [userName, setUserName] = useState('');
  const [userArea, setUserArea] = useState('');
  const [userImage, setUserImage] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  // var currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, '-');

  const inputName = useRef(null);

  //Validacion de solo numeros en input nomina
  const handleChangeNomina = e => {
    e.preventDefault();
    setNumNomina(e.target.value.replace(/\D/g, ''));
  };

  //Peticion de axios a la api
  const handleSubmit = async () => {
    let formData = new FormData();
    var currentDate = startDate.toJSON().slice(0, 10).replace(/-/g, '-');

    formData.append('option', 'selectEmpleado');
    formData.append('nomina', nomina);
    formData.append('date', currentDate);

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
          setMessage(response.data.message);
          setError(false);
          inputName.current.focus();
          inputName.current.select();
        } else {
          setUserName('');
          setUserImage('');
          setUserArea('');
          setMessage(response.data.message);
          setError(true);
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
    <>
      <Col className='component'>
        <Col className='col-sm-6 mt-5'>
          <Card className='card-style-bitacora'>
            <Card.Header className='titleLogin'>
              {' '}
              ⛽ BITÁCORA DE GASOLINA ⛽{' '}
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Row} className='box-home'>
                  <Col sm='4'>
                    <Form.Label column>Fecha de captura</Form.Label>
                    <DatePicker
                      className='date-picker-home'
                      dateFormat='dd/MM/yyyy'
                      selected={startDate}
                      onChange={handleChangeStartDate}
                      locale='es'
                    />
                  </Col>
                  <Col sm='8'>
                    <Form.Label>Número de nomina</Form.Label>
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
                </Form.Group>
              </Form>
              <div className='d-grid gap-2'>
                <Button onClick={handleSubmit} variant='primary' size='lg'>
                  Aceptar
                </Button>
              </div>
              {error ? (
                <div className='alert-box'>
                  <Alert className='alert' variant='danger'>
                    {message}
                  </Alert>
                </div>
              ) : null}
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
      </Col>
      <div className='delete-log'>
        <Button variant='danger' href='./delete-log'>
          Eliminar Registros
        </Button>
      </div>
    </>
  );
};
