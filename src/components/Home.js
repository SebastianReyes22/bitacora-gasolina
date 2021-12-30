import React, { useState } from "react";
import Axios from "axios";
import { Form, Button, Row, Col, Card } from "react-bootstrap";

export default function Home(props) {
  const URI = process.env.REACT_APP_SERVER_URL;

  const [nomina, setNumNomina] = useState("");
  const [userName, setUserName] = useState("");
  const [userArea, setUserArea] = useState("");
  const [userImage, setUserImage] = useState("");

  const handleChangeNomina = (e) => {
    e.preventDefault();
    setNumNomina(e.target.value);
  };

  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append("option", "selectEmpleado");
    formData.append("nomina", nomina);

    await Axios({
      method: "POST",
      url: URI,
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((response) => {
        if (response.data.info === true) {
          setUserName(response.data.name);
          setUserImage(response.data.picture);
          setUserArea(response.data.deparment);
        } else {
          alert(
            "Empleado no encontrado en la base de datos, comuniquese con el administrador"
          );
        }
      })
      .catch((error) => {
        console.log("Error en el servidor", error);
      });
  };

  const handleUpdate = async () => {};

  return (
    <Row className="App-header-home">
      <Col className="col-sm-6 mt-5 ">
        <Card className="card-style">
          <Card.Header className="titleLogin">
            {" "}
            ⛽ BITÁCORA DE GASOLINA ⛽{" "}
          </Card.Header>
          <Card.Body>
            <Form className="">
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextNomina"
              >
                <Form.Label column sm="2">
                  Número de nomina
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    value={nomina}
                    onChange={handleChangeNomina}
                    placeholder="12345"
                  />
                </Col>
              </Form.Group>
            </Form>
            <div className="d-grid gap-2">
              <Button onClick={handleSubmit} variant="primary" size="lg">
                Aceptar
              </Button>
            </div>
            <Form.Group as={Row} className="mt-5" controlId="formFechas">
              <Col sm="8">
                <Form.Label className="textUser" column>
                  {userName}
                </Form.Label>
              </Col>
              <Col sm="4">
                <Form.Label className="textUser" column>
                  {userArea}
                </Form.Label>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mt-5" controlId="formFechas">
              <Col>
                <img className="imageUser" src={userImage} alt=""/>
              </Col>
            </Form.Group>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
