import { React, useState } from 'react'
import Headers from '../Headers'
import { Form, Button, Row, Col, Card, Table } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Axios from 'axios'
import ReactHtmlTableToExcel from 'react-html-table-to-excel'

export default function BitacoraGasolina(props) {
  //Cadena de conexión
  const URI = process.env.REACT_APP_SERVER_URL

  //Variables de los imput que se mandan a la api
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [nomina, setNomina] = useState('')
  const [userName, setUserName] = useState('')
  const [department, setDepartment] = useState('')

  //Variables para mostrar en la tabla
  const [userData, setUserData] = useState([])

  //Funcion que cambia el valor de lafecha de inicio
  const handleChangeStartDate = (date) => {
    setStartDate(date)
  }

  //Funcion que cambia el valor de la fecha final
  const handleChangeEndDate = (date) => {
    setEndDate(date)
  }

  //Funcion que cambia el valor del input nomina
  const handleChangeNomina = (e) => {
    e.preventDefault()
    setNomina(e.target.value)
  }

  //Funcion que cambia el valor del input nombre
  const handleChangeUserName = (e) => {
    e.preventDefault()
    setUserName(e.target.value)
  }

  //Funcion que cambia el valor del input departamento
  const handleChangeDepartment = (e) => {
    e.preventDefault()
    setDepartment(e.target.value)
  }

  //Consulta de información seleccionada
  const handleSubmit = async () => {
    let formData = new FormData()
    formData.append('option', 'selectUser')
    formData.append('startDate', startDate.toJSON())
    formData.append('endDate', endDate.toJSON())
    formData.append('nomina', nomina)
    formData.append('userName', userName)
    formData.append('department', department)
    
    await Axios({
      method: 'POST',
      url: URI,
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then((response) => {
        if (response.data.user === false) {
          alert('Registros no encontrados')
          window.location = './bitacora-gasolina'
        } else {
          console.log(response.data)
          setUserData(response.data)
        }
      })
      .catch((error) => {
        console.log('Error en el servidor', error)
      })
  }

  //Funcion que limpia el dashboard
  const handleClean = () => {
    if (window.confirm('Realmente quieres limpiar la busqueda')) {
      window.location = './bitacora-gasolina'
    }
  }

  return (
    <>
      <Headers />
      <Row className="App-header">
        <Col className="mt-5">
          <Card className="card-style">
            <Card.Header className="titleLogin">Generar bitácora</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Row} className="mb-3" controlId="formFechas">
                  <Col sm="3">
                    <Form.Label column>Fecha de inicio</Form.Label>
                    <DatePicker
                      dateFormat="yyyy/MM/dd"
                      selected={startDate}
                      onChange={handleChangeStartDate}
                    />
                  </Col>
                  <Col sm="3">
                    <Form.Label column>Fecha de termino</Form.Label>
                    <DatePicker
                      dateFormat="yyyy/MM/dd"
                      selected={endDate}
                      onChange={handleChangeEndDate}
                    />
                  </Col>
                  <Col sm="2">
                    <div className="d-grid gap-2">
                      <Button
                        onClick={handleSubmit}
                        className="mt-4"
                        variant="primary"
                        size="lg"
                      >
                        Buscar
                      </Button>
                    </div>
                  </Col>
                  <Col sm="2">
                    <div className="d-grid gap-2">
                      <ReactHtmlTableToExcel 
                        id="btnExportExcel"
                        className="btn btn-success mt-4 btn-lg"
                        table="tableInfoUsers"
                        filname="bitácoragasolina"
                        sheet="Hoja 1"
                        buttonText="Descargar"
                      />
                    </div>
                  </Col>
                  <Col sm="2">
                    <div className="d-grid gap-2">
                      <Button
                        className="mt-4"
                        variant="danger"
                        size="lg"
                        onClick={handleClean}
                      >
                        Limpiar
                      </Button>
                    </div>
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  controlId="formPlaintextNomina"
                  className="mb-4"
                >
                  <Col sm="4">
                    <Form.Label>Número nomina</Form.Label>
                    <Form.Control
                      sm="6"
                      type="text"
                      value={nomina}
                      onChange={handleChangeNomina}
                      placeholder="Número de nomina"
                    />
                  </Col>
                  <Col sm="4">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      sm="6"
                      type="text"
                      placeholder="Nombre del empleado"
                      value={userName}
                      onChange={handleChangeUserName}
                    />
                  </Col>
                  <Col sm="4">
                    <Form.Label>Departamento</Form.Label>
                    <Form.Control
                      sm="6"
                      type="text"
                      placeholder="Nombre del departamento"
                      value={department}
                      onChange={handleChangeDepartment}
                    />
                  </Col>
                </Form.Group>
                <Table striped bordered hover id="tableInfoUsers">
                  <thead>
                    <tr>
                      <th>Nómina</th>
                      <th>Departamento</th>
                      <th>Nombre</th>
                      <th>Fecha de entrada</th>
                      <th>Fecha de salida</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData &&
                      userData.map((userInfo) => (
                        <tr key={userInfo.id}>
                          <td>{userInfo.nomina}</td>
                          <td>{userInfo.departamento}</td>
                          <td>{userInfo.nombre}</td>
                          <td>{userInfo.fechaEntrada}</td>
                          <td>{userInfo.fechaSalida}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}
