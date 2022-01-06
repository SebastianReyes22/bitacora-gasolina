import React, { useState } from 'react'
import axios from 'axios'
import Headers from '../Headers'
import { Form, Row, Col, Card, Button, Table } from 'react-bootstrap'
import DeleteRow from '../DeleteRow'

const DeleteUser = () => {
  //Cadena de conexión
  const URI = process.env.REACT_APP_SERVER_URL

  const [nomina, setNomina] = useState('')
  const [userName, setUserName] = useState('')
  const [department, setDepartment] = useState('')

  const [userData, setUserData] = useState([])
  const [editFormData, setEditFormData] = useState([]) //Constante que guarda el data de la api para editar
  const [editUserId, setEditUserId] = useState(null)

  //Funcion que cambia el valor del input nomina
  const handleChangeNomina = (e) => {
    e.preventDefault()
    setNomina(e.target.value.replace(/\D/g, ''))
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
  const handleSubmitGetInfo = async () => {
    let formData = new FormData()
    formData.append('option', 'selectUserDelete')
    formData.append('nomina', nomina)
    formData.append('userName', userName)
    formData.append('department', department)

    await axios({
      method: 'POST',
      url: URI,
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then((response) => {
        if (response.data.userDelete === false) {
          alert('Registros no encontrados')
          window.location = './eliminarUsuario'
        } else {
          console.log(response.data)
          setUserData(response.data)
        }
      })
      .catch((error) => {
        console.log('Error en el servidor', error)
      })
  }

  const handleSubmitDelete = async (userInfo) => {
    let formData = new FormData()
    formData.append('option', 'deleteUser')
    formData.append('nomina', userInfo.nomina)

    await axios({
      method: 'POST',
      url: URI,
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then((response) => {
        if (!response.data.delete) {
          alert('Eror comuniquese con el administrador')
          window.location = './eliminarUsuario'
        } else {
          alert('Usuario eliminado correctamente')
          window.location = './eliminarUsuario'
        }
      })
      .catch((error) => {
        console.log('Error en el servidor', error)
      })
  }
  //Funcion que limpia el dashboard
  const handleClean = () => {
    if (window.confirm('Realmente quieres limpiar la busqueda')) {
      window.location = './eliminarUsuario'
    }
  }

  const handleDeleteClick = (e, userInfo) => {
    if (window.confirm('¿Realmente quieres limpiar la tabla?')) {
      e.preventDefault()
      setEditUserId(userInfo.id)
  
      const formValues = {
        id: editUserId,
        nomina: userInfo.nomina,
        nombre: userInfo.nombre,
        departamento: userInfo.departamento,
        asistencia: userInfo.asistencia,
        promedio: userInfo.promedio,
      }
      setEditFormData(formValues)
      console.log(userInfo.nombre)
      handleSubmitDelete(userInfo)
    }
  }

  return (
    <>
      <Headers />
      <Row className="App-header">
        <Col className="mt-5">
          <Card className="card-style">
            <Card.Header className="titleLogin">Eliminar Usuario</Card.Header>
            <Card.Body>
              <Form>
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
                      onChange={handleChangeNomina.bind(this)}
                      placeholder="Número de nomina"
                      maxLength="5"
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
                    <Form.Select
                      sm="6"
                      type="text"
                      placeholder="Nombre del departamento"
                      value={department}
                      onChange={handleChangeDepartment}
                    >
                      <option value="">Seleccionar Departamento</option>
                      <option value="MARKETING DEPT">MARKETING DEPT</option>
                      <option value="MAINTENANCE SECTION">
                        MAINTENANCE SECTION
                      </option>
                      <option value="QUALITY CONTROL SECTION">
                        QUALITY CONTROL SECTION
                      </option>
                      <option value="TRANSPORT CONTROL SECTION">
                        TRANSPORT CONTROL SECTION
                      </option>
                      <option value="PRODUCTION MANAGMENT SECTION">
                        PRODUCTION MANAGMENT SECTION
                      </option>
                      <option value="SALES 1 SECTION">SALES 1 SECTION</option>
                      <option value="SALES TEAM">SALES TEAM</option>
                      <option value="ACCOUNTING TEAM">ACCOUNTING TEAM</option>
                      <option value="HR TEAM">HR TEAM</option>
                      <option value="IT TEAM">IT TEAM</option>
                      <option value="PLANT">PLANT</option>
                      <option value="GENERAL AFFAIRS TEAM">
                        GENERAL AFFAIRS TEAM
                      </option>
                      <option value="TREASURY TEAM">TREASURY TEAM</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formFechas">
                  <Col sm="8" />
                  <Col sm="2">
                    <div className="d-grid gap-2">
                      <Button
                        className="mt-2"
                        variant="primary"
                        size="lg"
                        onClick={handleSubmitGetInfo}
                      >
                        Buscar
                      </Button>
                    </div>
                  </Col>
                  <Col sm="2">
                    <div className="d-grid gap-2">
                      <Button
                        className="mt-2"
                        variant="danger"
                        size="lg"
                        onClick={handleClean}
                      >
                        Limpiar
                      </Button>
                    </div>
                  </Col>
                </Form.Group>
                <Table striped bordered hover id="tableInfoUsers">
                  <thead>
                    <tr>
                      <th>Nómina</th>
                      <th>Nombre</th>
                      <th>Departamento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData &&
                      userData.map((userInfo) => (
                        <DeleteRow
                          userInfo={userInfo}
                          handleDeleteClick={handleDeleteClick}
                        />
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

export default DeleteUser
