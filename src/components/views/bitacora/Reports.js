import { Fragment, useState } from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import Axios from 'axios';

import { EditableRow, Headers, HeadersAdmin, ReadOnlyRow } from '../../helpers';
import ReactHtmlTableToExcel from 'react-html-table-to-excel';
import { useUserAuth } from '../../../context/UserAuthContext';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';

export const Reports = () => {
  //Cadena de conexión
  const URI = process.env.REACT_APP_SERVER_URL;

  const date = new Date();
  const currentMonth = date.toLocaleString('es-MX', { month: 'long' }); //Obtiene el mes en curso
  const firstDate = new Date(date.getFullYear(), date.getMonth(), 1); //Obtiene el primer día del mes en curso
  const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0); //Obtiene el último día del mes en curso

  const fileName = 'Reporte de asistencia ' + currentMonth.toString(); //Nombre del archivo de excel

  const [userData, setUserData] = useState([]); //Constante que guarda el data de la api
  const [editFormData, setEditFormData] = useState([]); //Constante que guarda el data de la api para editar
  const [editUserId, setEditUserId] = useState(null);

  const { userRol } = useUserAuth();

  // Datepicker
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [datePicker, setDatePicker] = useState(null);
  const [endDatePicker, setEndDatePicker] = useState(null);
  registerLocale('es', es);

  // Input de ubicacion de planta
  const [ubicacion, setUbicacion] = useState('');

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

  //Petición de axios a la api
  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append('option', 'getReports');
    formData.append('startDate', datePicker);
    formData.append('endDate', endDatePicker);
    formData.append('planta', ubicacion);

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

  //Función que guarda el estado en el form para editar
  const handleEditClick = (e, userInfo) => {
    e.preventDefault();
    setEditUserId(userInfo.id);

    const formValues = {
      nomina: userInfo.nomina,
      nombre: userInfo.nombre,
      departamento: userInfo.departamento,
      asistencia: userInfo.asistencia,
      promedio: userInfo.promedio,
    };
    setEditFormData(formValues);
  };

  //Función que cambia la fila seleccionada en la tabla para poder editar
  const handleEditFormChange = e => {
    e.preventDefault();

    const fieldName = e.target.getAttribute('name');
    const fieldValue = e.target.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  //Función que guarda los cambios editados en la tabla
  const handleEditFormSubmit = e => {
    e.preventDefault();

    const editedUser = {
      id: editUserId,
      nomina: editFormData.nomina,
      nombre: editFormData.nombre,
      departamento: editFormData.departamento,
      asistencia: editFormData.asistencia,
      promedio: editFormData.promedio,
    };

    const newUserData = [...userData];
    const index = userData.findIndex(userInfo => userInfo.id === editUserId);
    newUserData[index] = editedUser;
    setUserData(newUserData);
    setEditUserId(null);
  };

  //Lipiar la tabla
  const handleSubmitClean = () => {
    if (window.confirm('¿Realmente quieres limpiar la tabla?')) {
      setUserData([]);
    }
  };

  return (
    <>
      {userRol.rol == '1' ? <HeadersAdmin /> : <Headers />}
      <Col className='component'>
        <Col className='mt-3 col-sm-10 mb-5'>
          <Card className='card-style-bitacora'>
            <Card.Header className='titleLogin'>Reporte mensual</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className='mb-3' controlId='formFechas'>
                  <Row>
                    <Col className='col-3'>
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
                    <Col>
                      <Form.Label column>Fecha de inicio</Form.Label>
                      <DatePicker
                        placeholderText='Selecciona una fecha'
                        dateFormat='yyyy/MM/dd'
                        selected={startDate}
                        onChange={handleChangeStartDate}
                        locale='es'
                      />
                    </Col>
                    <Col>
                      <Form.Label column>Fecha de termino</Form.Label>
                      <DatePicker
                        dateFormat='yyyy/MM/dd'
                        placeholderText='Selecciona una fecha'
                        selected={endDate}
                        onChange={handleChangeEndDate}
                        minDate={startDate}
                        locale='es'
                      />
                    </Col>
                    <Col className='mt-4'>
                      <div className='d-grid gap-2'>
                        <ReactHtmlTableToExcel
                          id='btnExportExcel'
                          className='btn btn-success btn-lg'
                          table='tableInfoUsers'
                          filename={fileName}
                          sheet='Hoja 1'
                          buttonText='Descargar'
                          />
                      </div>
                    </Col>
                    <Col className='mt-4'>
                      <div className='d-grid gap-2'>
                        <Button
                          variant='danger'
                          size='lg'
                          onClick={handleSubmitClean}>
                          Limpiar
                        </Button>
                      </div>
                    </Col>
                    <Col className='col-8' />
                    <Col className='mt-4 col-4'>
                      <div className='d-grid gap-2'>
                        <Button
                          variant='primary'
                          size='lg'
                          onClick={handleSubmit}>
                          Consultar reporte de asistencia
                        </Button>
                      </div>
                    </Col>
                  </Row>
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
                      <th>Días Asistidos</th>
                      <th>%</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData &&
                      userData.map(userInfo => (
                        <Fragment>
                          {editUserId === userInfo.id ? (
                            <EditableRow
                              editFormData={editFormData}
                              handleEditFormChange={handleEditFormChange}
                              handleEditFormSubmit={handleEditFormSubmit}
                            />
                          ) : (
                            <ReadOnlyRow
                              userInfo={userInfo}
                              handleEditClick={handleEditClick}
                            />
                          )}
                        </Fragment>
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
