import { React } from 'react'
import Headers from './Headers'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

const date = new Date()
const currentMonth = date.toLocaleString("es-MX", {month: "long"})

const Reports = () => {
  return (
    <>
      <Headers />
      <Row className="App-header-home">
      <Col className="col-sm-4 mt-5">
        <Card className="card-style">
          <Card.Header className="titleLogin">Reporte mensual</Card.Header>
          <Card.Body>
            <Form>
              <div className="d-grid gap-2">
                <Button variant="primary" size="lg">
                  Descargar reporte de {currentMonth}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    </>
  )
}

export default Reports