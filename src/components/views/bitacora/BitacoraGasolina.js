import { useState } from 'react';
import Axios from 'axios';

import { Form, Button, Row, Col, Card, Table } from 'react-bootstrap';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactHtmlTableToExcel from 'react-html-table-to-excel';
import es from 'date-fns/locale/es';

import { Headers, HeadersAdmin } from '../../helpers';
import { useUserAuth } from '../../../context/UserAuthContext';

export const BitacoraGasolina = () => {
  //Cadena de conexión
  const URI = process.env.REACT_APP_SERVER_URL;

  //Variables de los imput que se mandan a la api
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [datePicker, setDatePicker] = useState(null);
  const [endDatePicker, setEndDatePicker] = useState(null);

  const [nomina, setNomina] = useState('');
  const [userName, setUserName] = useState('');
  const [department, setDepartment] = useState('');

  //Variables para mostrar en la tabla
  const [userData, setUserData] = useState([]);

  // Input de ubicacion de planta
  const [ubicacion, setUbicacion] = useState('');

  const { userRol } = useUserAuth();

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

  //Funcion que cambia el valor de la fecha final
  const handleChangeEndDate = date => {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    setEndDatePicker(year + '-' + month + '-' + day);
    setEndDate(date);
  };

  //Funcion que cambia el valor del input nomina
  const handleChangeNomina = e => {
    e.preventDefault();
    setNomina(e.target.value.replace(/\D/g, ''));
  };

  //Consulta de información seleccionada
  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append('option', 'selectUser');
    formData.append('planta', ubicacion);
    formData.append('startDate', datePicker);
    formData.append('endDate', endDatePicker);
    formData.append('nomina', nomina);
    formData.append('userName', userName);
    formData.append('department', department);

    await Axios({
      method: 'POST',
      url: URI,
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then(response => {
        if (response.data.user === false) {
          alert('Registros no encontrados');
        } else {
          setUserData(response.data);
        }
      })
      .catch(error => {
        console.log('Error en el servidor', error);
      });
  };

  //Funcion que limpia el dashboard
  const handleClean = () => {
    if (window.confirm('Realmente quieres limpiar la busqueda')) {
      setNomina('');
      setUserName('');
      setDepartment('');
      setUserData([]);
    }
  };

  return (
    <>
      {userRol.rol == '1' ? <HeadersAdmin /> : <Headers />}
      <Col className='component'>
        <Col className='mt-3 col-sm-10 mb-5'>
          <Card className='card-style-bitacora'>
            <Card.Header className='titleLogin'>Generar bitácora</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className='mb-3' controlId='formFechas'>
                  <Row>
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
                    <Col className='col-2'>
                      <Form.Label column>Fecha de inicio</Form.Label>
                      <DatePicker
                        dateFormat='yyyy/MM/dd'
                        placeholderText='Selecciona una fecha'
                        selected={startDate}
                        onChange={handleChangeStartDate}
                        locale='es'
                      />
                    </Col>
                    <Col className='col-2'>
                      <Form.Label column>Fecha de termino</Form.Label>
                      <DatePicker
                        dateFormat='yyyy/MM/dd'
                        placeholderText='Selecciona una fecha'
                        selected={endDate}
                        onChange={handleChangeEndDate}
                        locale='es'
                        minDate={startDate}
                        />
                    </Col>
                    <Col className='col-6'>
                      <Form.Label>Número nomina</Form.Label>
                      <Form.Control
                        sm='6'
                        type='text'
                        value={nomina}
                        onChange={handleChangeNomina.bind(this)}
                        placeholder='Número de nomina'
                        maxLength='5'
                        />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId='formPlaintextNomina' className='mb-4'>
                  <Row>
                    <Col className='col-3'>
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        sm='6'
                        type='text'
                        placeholder='Nombre del empleado'
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        />
                    </Col>
                    <Col className='col-3'>
                      <Form.Label>Departamento</Form.Label>
                      <Form.Select
                        sm='6'
                        type='text'
                        placeholder='Nombre del departamento'
                        value={department}
                        onChange={e => setDepartment(e.target.value)}>
                        <option value=''>Seleccionar Departamento</option>
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
                    <Col className='col-2'>
                      <div className='d-grid gap-2'>
                        <Button
                          onClick={handleSubmit}
                          className='mt-4'
                          variant='primary'
                          size='lg'>
                          Buscar
                        </Button>
                      </div>
                    </Col>
                    <Col className='col-2'>
                      <div className='d-grid gap-2'>
                        <ReactHtmlTableToExcel
                          id='btnExportExcel'
                          className='btn btn-success mt-4 btn-lg'
                          table='tableInfoUsers'
                          filename='bitácoragasolina'
                          sheet='Hoja 1'
                          buttonText='Descargar'
                          />
                      </div>
                    </Col>
                    <Col className='col-2'>
                      <div className='d-grid gap-2'>
                        <Button
                          className='mt-4'
                          variant='danger'
                          size='lg'
                          onClick={handleClean}>
                          Limpiar
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form.Group>
                <Table
                  striped
                  bordered
                  hover
                  id='tableInfoUsers'
                  className='table-style'>
                  <thead>
                    <tr>
                      <th>Nómina</th>
                      <th>Departamento</th>
                      <th>Nombre</th>
                      <th>Fecha de entrada</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData &&
                      userData.map(userInfo => (
                        <tr key={userInfo.id}>
                          <td>{userInfo.nomina}</td>
                          <td>{userInfo.departamento}</td>
                          <td>{userInfo.nombre}</td>
                          <td>{userInfo.date}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Col>
    </>
  );
};
