import { Fragment, React, useState } from 'react';
import Axios from 'axios';
import Headers from '../Headers';
import HeadersAdmin from '../HeadersAdmin';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import ReadOnlyRow from '../ReadOnlyRow';
import EditableRow from '../EditableRow';
import ReactHtmlTableToExcel from 'react-html-table-to-excel';
import { useUserAuth } from '../../context/UserAuthContext';

export default function Reports() {
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

  //Petición de axios a la api
  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append('option', 'getReports');
    formData.append('startDate', firstDate.toJSON());
    formData.append('endDate', lastDate.toJSON());

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
      {userRol.rol === '0' ? <Headers /> : <HeadersAdmin />}
      <Row className='component'>
        <Col className='mt-3 col-sm-10 mb-5'>
          <Card className='card-style-bitacora'>
            <Card.Header className='titleLogin'>Reporte mensual</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Row} className='mb-3' controlId='formFechas'>
                  <Col sm='6'>
                    <div className='d-grid gap-2'>
                      <Button
                        variant='primary'
                        size='lg'
                        onClick={handleSubmit}>
                        Consultar reporte de {currentMonth}
                      </Button>
                    </div>
                  </Col>
                  <Col sm='3'>
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
                  <Col sm='3'>
                    <div className='d-grid gap-2'>
                      <Button
                        variant='danger'
                        size='lg'
                        onClick={handleSubmitClean}>
                        Limpiar
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
      </Row>
    </>
  );
}
