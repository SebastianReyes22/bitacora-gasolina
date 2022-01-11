import React, { useState } from 'react';
import Axios from 'axios';
import Headers from '../../components/Headers';
import { Form, Row, Col, Card, Button } from 'react-bootstrap';

export default function CreateUser() {
  const URI = process.env.REACT_APP_SERVER_URL;

  const [nomina, setNomina] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  var picture;

  //Funcion para sacar el valor del input de nomina
  const handleNomina = e => {
    e.preventDefault();
    setNomina(e.target.value.replace(/\D/g, ''));
  };

  //Funcion para sacar el valor del input de nombre
  const handleName = e => {
    e.preventDefault();
    setName(e.target.value);
  };

  //Funcion que convierte la imagen a base64
  const convertToBase64 = files => {
    Array.from(files).forEach(file => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        var base64 = reader.result;
        picture = base64;
      };
    });
  };

  //Funcion para sacar el valor del input de departamento
  const handleDepartment = e => {
    e.preventDefault();
    setDepartment(e.target.value);
  };

  //Funcion que manda el POST a la bd
  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append('option', 'insertUser');
    formData.append('nomina', nomina);
    formData.append('nombre', name);
    formData.append('foto', picture);
    formData.append('departamento', department);

    await Axios({
      method: 'POST',
      url: URI,
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then(response => {
        if (response.data.insert === true) {
          alert('Datos capturados correctamente');
          window.location = '/addUser';
        } else {
          alert('Err, comuniquese con el administrador');
        }
      })
      .catch(error => {
        console.log('Error en el servidor', error);
      });
  };

  //Funcion que limpa todos los imput a su valor por defecto
  const handleRefresh = () => {
    window.location = '/addUser';
  };

  return (
    <>
      <Headers />
      <Row className='App-header'>
        <Col className='mt-5'>
          <Card className='card-style'>
            <Card.Header className='titleLogin'>Agregar empleado</Card.Header>
            <Card.Body>
              <Form className=''>
                <Form.Group as={Row} className='mb-3' controlId='formFechas'>
                  <Col sm='3'>
                    <Form.Label column>Número de nomina</Form.Label>
                    <Form.Control
                      sm='6'
                      type='text'
                      placeholder='Número de nomina'
                      value={nomina}
                      onChange={handleNomina.bind(this)}
                      maxLength='5'
                    />
                  </Col>
                  <Col sm='3'>
                    <Form.Label column>Nombre completo</Form.Label>
                    <Form.Control
                      sm='6'
                      type='text'
                      placeholder='Nombre completo'
                      value={name}
                      onChange={handleName}
                    />
                  </Col>
                  <Col sm='3'>
                    <Form.Label column>Departamento</Form.Label>
                    <Form.Select
                      value={department}
                      onChange={handleDepartment}
                      aria-label='Default select example'>
                      <option>Seleccionar Departamento</option>
                      <option value='MARKETING DEPT'>MARKETING DEPT</option>
                      <option value='MAINTENANCE SECTION'>
                        MAINTENANCE SECTION
                      </option>
                      <option value='QUALITY CONTROL SECTION'>
                        QUALITY CONTROL SECTION
                      </option>
                      <option value='TRANSPORT CONTROL SECTION'>
                        TRANSPORT CONTROL SECTION
                      </option>
                      <option value='PRODUCTION MANAGMENT SECTION'>
                        PRODUCTION MANAGMENT SECTION
                      </option>
                      <option value='SALES 1 SECTION'>SALES 1 SECTION</option>
                      <option value='SALES TEAM'>SALES TEAM</option>
                      <option value='ACCOUNTING TEAM'>ACCOUNTING TEAM</option>
                      <option value='HR TEAM'>HR TEAM</option>
                      <option value='IT TEAM'>IT TEAM</option>
                      <option value='PLANT'>PLANT</option>
                      <option value='GENERAL AFFAIRS TEAM'>
                        GENERAL AFFAIRS TEAM
                      </option>
                      <option value='TREASURY TEAM'>TREASURY TEAM</option>
                    </Form.Select>
                  </Col>
                  <Col sm='3'>
                    <Form.Label column>Cargar imagen</Form.Label>
                    <Form.Control
                      type='file'
                      size='mg'
                      accept='.jpg, .png, .jpeg'
                      onChange={e => convertToBase64(e.target.files)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='mb-3' controlId='formFechas'>
                  <Col sm='5' />
                  <Col sm='5' />
                  <Col sm='1'>
                    <Button
                      className='mt-4'
                      variant='primary'
                      size='lg'
                      onClick={handleSubmit}>
                      Guardar
                    </Button>
                  </Col>
                  <Col sm='1'>
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
}
