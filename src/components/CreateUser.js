import React, { useState } from "react";
import Axios from "axios";
import Headers from "./Headers";
import { Form, Row, Col, Card, Button } from "react-bootstrap";

export default function CreateUser() {
  const URI = process.env.REACT_APP_SERVER_URL;

  const [nomina, setNomina] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  var picture;

  //Funcion para sacar el valor del input de nomina
  const handleNomina = (e) => {
    e.preventDefault();
    setNomina(e.target.value);
  };

  //Funcion para sacar el valor del input de nombre
  const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  //Funcion que convierte la imagen a base64
  const convertToBase64 = (files) => {
    Array.from(files).forEach((file) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        var base64 = reader.result;
        picture = base64;
        console.log(picture);
      };
    });
  };

  //Funcion para sacar el valor del input de departamento
  const handleDepartment = (e) => {
    e.preventDefault();
    setDepartment(e.target.value);
  };

  //Funcion que manda el POST a la bd
  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append("option", "insertUser");
    formData.append("nomina", nomina);
    formData.append("nombre", name);
    formData.append("foto", picture);
    formData.append("departamento", department);

    await Axios({
      method: "POST",
      url: URI,
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((response) => {
        if (response.data.insert === true) {
          console.log("Datos capturados correctamente");
          alert("Datos capturados correctamente");
          window.location = "/addUser";
        } else {
          alert("Err, comuniquese con el administrador");
        }
      })
      .catch((error) => {
        console.log("Error en el servidor", error);
      });
  };

  //Funcion que limpa todos los imput a su valor por defecto
  const handleRefresh = () => {
    window.location = "/addUser";
  };

  return (
    <>
      <Headers />
      <Row className="App-header">
        <Col className="mt-5">
          <Card className="card-style">
            <Card.Header className="titleLogin">Agregar empleado</Card.Header>
            <Card.Body>
              <Form className="">
                <Form.Group as={Row} className="mb-3" controlId="formFechas">
                  <Col sm="3">
                    <Form.Label column>Número de nomina</Form.Label>
                    <Form.Control
                      sm="6"
                      type="text"
                      placeholder="Número de nomina"
                      value={nomina}
                      onChange={handleNomina}
                    />
                  </Col>
                  <Col sm="3">
                    <Form.Label column>Nombre completo</Form.Label>
                    <Form.Control
                      sm="6"
                      type="text"
                      placeholder="Nombre completo"
                      value={name}
                      onChange={handleName}
                    />
                  </Col>
                  <Col sm="3">
                    <Form.Label column>Departamento</Form.Label>
                    <Form.Select
                      value={department}
                      onChange={handleDepartment}
                      aria-label="Default select example"
                    >
                      <option>Seleccionar Departamento</option>
                      <option value="Administración">Administración</option>
                      <option value="Almacen">Almacen</option>
                      <option value="Calidad">Calidad</option>
                      <option value="Facturación">Facturación</option>
                      <option value="Finanzas">Finanzas</option>
                      <option value="Producción">Producción</option>
                      <option value="RH">RH</option>
                      <option value="Sistemas">Sistemas</option>
                      <option value="Ventas">Ventas</option>
                    </Form.Select>
                  </Col>
                  <Col sm="3">
                    <Form.Label column>Cargar imagen</Form.Label>
                    <Form.Control
                      type="file"
                      size="mg"
                      onChange={(e) => convertToBase64(e.target.files)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formFechas">
                  <Col sm="5" />
                  <Col sm="5" />
                  <Col sm="1">
                    <Button
                      className="mt-4"
                      variant="primary"
                      size="lg"
                      onClick={handleSubmit}
                    >
                      Guardar
                    </Button>
                  </Col>
                  <Col sm="1">
                    <div className="d-grid gap-2">
                      <Button
                        className="mt-4"
                        variant="danger"
                        size="lg"
                        onClick={handleRefresh}
                      >
                        Limpiar
                      </Button>
                    </div>
                  </Col>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}