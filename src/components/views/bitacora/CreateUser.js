import { useState } from 'react';
import { Form, Row, Col, Card, Button } from 'react-bootstrap';
import Axios from 'axios';

import { Headers, HeadersAdmin } from '../../helpers';
import { useUserAuth } from '../../../context/UserAuthContext';

export const CreateUser = () => {
  const URI = process.env.REACT_APP_SERVER_URL;

  const [nomina, setNomina] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  var picture;

  const { userRol } = useUserAuth();

  //Funcion para sacar el valor del input de nomina
  const handleNomina = e => {
    e.preventDefault();
    setNomina(e.target.value.replace(/\D/g, ''));
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
          setNomina('');
          setName('');
          setDepartment('');
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
    if (window.confirm('¿Realmente quieres limpiar la busqueda?')) {
      setNomina('');
      setName('');
      setDepartment('');
    }
  };

  return (
    <>
      {userRol.rol == '1' ? <HeadersAdmin /> : <Headers />}
      <Col className='component'>
        <Col className='mt-3 col-sm-10'>
          <Card className='card-style-bitacora'>
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
                      onChange={e => setName(e.target.value)}
                    />
                  </Col>
                  <Col sm='3'>
                    <Form.Label column>Departamento</Form.Label>
                    <Form.Select
                      value={department}
                      onChange={e => setDepartment(e.target.value)}
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
      </Col>
    </>
  );
};
