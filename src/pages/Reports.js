import { Fragment, React, useState } from 'react'
import Axios from 'axios'
import Headers from '../components/Headers'
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap'
import ReadOnlyRow from './tables/ReadOnlyRow'
import EditableRow from './tables/EditableRow'

export default function Reports() {
  //Cadena de conexión
  const URI = process.env.REACT_APP_SERVER_URL

  const date = new Date()
  const currentMonth = date.toLocaleString('es-MX', { month: 'long' }) //Obtiene el mes en curso
  const firstDate = new Date(date.getFullYear(), date.getMonth(), 1) //Obtiene el primer día del mes en curso
  const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0) //Obtiene el último día del mes en curso
  const [userData, setUserData] = useState([]) //Constante que guarda el data de la api
  const [editFormData, setEditFormData] = useState([]) //Constante que guarda el data de la api para editar campos

  const [editUserId, setEditUserId] = useState(null)

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleSubmit = async () => {
    let formData = new FormData()
    formData.append('option', 'getReports')
    formData.append('startDate', firstDate.toJSON())
    formData.append('endDate', lastDate.toJSON())

    await Axios({
      method: 'POST',
      url: URI,
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then((response) => {
        if (response.data.user === false) {
          alert('Registros no encontrados')
          window.location = './reportes'
        } else {
          setUserData(response.data)
          setEditFormData(response.data)
        }
      })
      .catch((error) => {
        console.log('Error en el servidor', error)
      })
  }

  const handleEditClick = (e, userInfo) => {
    e.preventDefault()
    setEditUserId(userInfo.id)

    /*
    const formValues = {
      nomina: userInfo.nomina,
      nombre: userInfo.nombre,
      departamento: userInfo.departamento,
      asistencia: userInfo.asistencia,
      promedio: userInfo.promedio,
    }

    setEditFormData(formValues)
    */
  }

  return (
    <>
      <Headers />
      <Row className="App-header-home">
        <Col className="mt-5">
          <Card className="card-style">
            <Card.Header className="titleLogin">Reporte mensual</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Row} className="mb-3" controlId="formFechas">
                  <div className="d-grid gap-2">
                    <Button variant="primary" size="lg" onClick={handleSubmit}>
                      Consultar reporte de {currentMonth}
                    </Button>
                  </div>
                </Form.Group>
                <Table striped bordered hover id="tableInfoUsers">
                  <thead>
                    <tr>
                      <th>Nómina</th>
                      <th>Nombre</th>
                      <th>Departamento</th>
                      <th>Días Asistidos</th>
                      <th>%</th>
                      <th>Editar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData &&
                      userData.map((userInfo) => (
                        <Fragment>
                          {editUserId === userInfo.id ? (
                            <EditableRow userInfo={userInfo} />
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
      {/*<Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              {userData &&
                userData.map((userInfo) => (
                  <Form.Label>{userInfo.nombre}</Form.Label>
                ))}
              <Form.Control type="text" placeholder="Nombre de usuario" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>*/}
    </>
  )
}
