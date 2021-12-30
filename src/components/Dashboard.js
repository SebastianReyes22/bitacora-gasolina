import { React, useEffect, useState } from "react";
import Headers from "./Headers";
import { Form, Button, Row, Col, Card, Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Axios from "axios";

export default function Dashboard() {
  //Cadena de conexión
  const URI = process.env.REACT_APP_SERVER_URL;

  //Variables de los imput que se mandan a la api
  const [date, setDate] = useState(new Date());
  const [nomina, setNomina] = useState("");

  //Variables para mostrar en la tabla
  const [userData, setUserData] = useState([]);

  //Funcion que cambia el valor del input nomina
  const handleChangeNomina = (e) => {
    e.preventDefault();
    setNomina(e.target.value);
  };

  //Consulta de información seleccionada
  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append("option", "selectUser");
    formData.append("nomina", nomina);

    await Axios({
      method: "POST",
      url: URI,
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((response) => {
        if (response.data.user === false) {
          alert("Registros no encontrados");
          window.location = "./dashboard";
        } else {
          console.log(response.data);
          setUserData(response.data);
        }
      })
      .catch((error) => {
        console.log("Error en el servidor", error);
      });
  };

  //Funcion que limpia el dashboard
  const handleClean = () => {
    if (window.confirm("Realmente quieres limpiar la busqueda")) {
      window.location = "./dashboard";
    }
  };

  return (
    <>
      <Headers />
      <Row className="App-header">
        <Col className="mt-5">
          <Card className="card-style">
            <Card.Header className="titleLogin">Generar bitácora</Card.Header>
            <Card.Body>
              <Form className="">
                <Form.Group as={Row} className="mb-3" controlId="formFechas">
                  <Col sm="3">
                    <Form.Label column>Fecha de Inicio</Form.Label>
                    <DatePicker
                      selected={date}
                      onChange={(date) => setDate(date)}
                      dateFormat="Pp"
                    />
                  </Col>
                  <Col sm="3">
                    <Form.Label column>Fecha de Termino</Form.Label>
                    <DatePicker
                      selected={date}
                      onChange={(date) => setDate(date)}
                      dateFormat="Pp"
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
                      <Button className="mt-4" variant="success" size="lg">
                        Descargar
                      </Button>
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
                    />
                  </Col>
                  <Col sm="4">
                    <Form.Label>Departamento</Form.Label>
                    <Form.Control
                      sm="6"
                      type="text"
                      placeholder="Nombre del departamento"
                    />
                  </Col>
                </Form.Group>
                <Table striped bordered hover>
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
  );
}
