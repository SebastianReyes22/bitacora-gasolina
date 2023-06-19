import { useState } from 'react';
import Axios from 'axios';
import { Alert, Button, Card, Col, Form, Row, Table } from 'react-bootstrap';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';

import { NavCaseta } from './NavCaseta';

export const DeleteLog = () => {
  //Cadena de conexión
  const URI = process.env.REACT_APP_SERVER_URL;

  const [error, setError] = useState(false);

  // Datepicker
  const [startDate, setStartDate] = useState(null);
  const [datePicker, setDatePicker] = useState(null);

  registerLocale('es', es);
  //Funcion que cambia el valor de lafecha de inicio
  const handleChangeStartDate = date => {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    setDatePicker(year + '-' + month + '-' + day);

    setStartDate(date);
  };

  //Variables para mostrar en la tabla
  const [userData, setUserData] = useState([]);
  const [nomina, setNomina] = useState('');

  // Input de ubicacion de planta
  const [ubicacion, setUbicacion] = useState('');

  //Funcion que busca los datos de la bitacora
  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append('option', 'findLog');
    formData.append('nomina', nomina);
    formData.append('date', datePicker);
    formData.append('planta', ubicacion);

    await Axios({
      method: 'POST',
      url: URI,
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then(response => {
        if (response.data.registros === false) {
          setNomina('');
          setUserData([]);
          setError(true);
        } else {
          setUserData(response.data);
          setError(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  //Funcion para eliminar registros
  const handleDelete = async () => {
    let formData = new FormData();
    formData.append('option', 'deleteLog');
    formData.append('nomina', nomina);
    formData.append('date', datePicker);

    await Axios({
      method: 'POST',
      url: URI,
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then(response => {
        if (response.data.delete === false) {
          alert('Registros no encontrados');
        } else {
          alert('Registros eliminados');
          setUserData([]);
          setUbicacion('');
          setNomina('')
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  //Funcion que limpia el dashboard
  const handleClean = () => {
    if (window.confirm('Realmente quieres limpiar la busqueda')) {
      setNomina('');
      setUserData([]);
      setStartDate(null);
      setDatePicker(null);
      setError(false);
    }
  };

  //Funcion que cambia el valor del input nomina
  const handleChangeNomina = e => {
    e.preventDefault();
    setNomina(e.target.value.replace(/\D/g, ''));
  };

  return (
    <>
      <NavCaseta />
      <Col className='component'>
        <Col className='mt-3 col-sm-10 mb-5'>
          <Card className='card-style-bitacora'>
            <Card.Header className='titleLogin'>
              Registros de asistencia
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Row} className='mb-3' controlId='formFechas'>
                  <Col className='col-2'>
                    <Form.Label>Planta</Form.Label>
                    <Form.Select
                      value={ubicacion}
                      onChange={e => setUbicacion(e.target.value)}>
                      <option value=''>Seleccione ubicación</option>
                      <option value='1'>Puebla</option>
                      <option value='2'>San Luis Potosi</option>
                      <option value='3'>Celaya</option>
                      <option value='4'>Aguascalientes</option>
                    </Form.Select>
                  </Col>
                  <Col className='mt-1 col-2'>
                    <Form.Label>Fecha de inicio</Form.Label>
                    <DatePicker
                      className='date-picker-home-style'
                      dateFormat='yyyy/MM/dd'
                      placeholderText='Selecciona una fecha'
                      locale='es'
                      onChange={handleChangeStartDate}
                      selected={startDate}
                    />
                  </Col>
                  <Col sm='4'>
                    <Form.Label>Nomina</Form.Label>
                    <Form.Control
                      className='input-style'
                      maxLength='5'
                      type='text'
                      placeholder='Número de nomina'
                      value={nomina}
                      onChange={handleChangeNomina.bind(this)}
                    />
                  </Col>
                  <Col sm='2' className='mt-4'>
                    <div className='d-grid gap-2'>
                      <Button variant='primary' onClick={handleSubmit}>
                        <FontAwesomeIcon icon={faSearch} /> Consultar
                      </Button>
                    </div>
                  </Col>
                  <Col sm='2' className='mt-4'>
                    <div className='d-grid gap-2'>
                      <Button variant='danger' onClick={handleClean}>
                        <FontAwesomeIcon icon={faTrash} /> Limpiar
                      </Button>
                    </div>
                  </Col>
                </Form.Group>
                <Table
                  className='table-style'
                  striped
                  bordered
                  hover
                  id='tableInfoUsers'>
                  <thead>
                    <tr>
                      <th>Nómina</th>
                      <th>Nombre</th>
                      <th>Departamento</th>
                      <th>Borrar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData &&
                      userData.map(userInfo => (
                        <tr key={userInfo.id}>
                          <td>{userInfo.nomina}</td>
                          <td>{userInfo.nombre}</td>
                          <td>{userInfo.departamento}</td>
                          <td>
                            <div className='d-grid gap-2'>
                              <Button
                                variant='danger'
                                size='sm'
                                onClick={handleDelete}>
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Form>
              {error ? (
                <div className='alert-box'>
                  <Alert className='alert' variant='danger'>
                    No se encontraron registros
                  </Alert>
                </div>
              ) : null}
            </Card.Body>
          </Card>
        </Col>
      </Col>
    </>
  );
};
