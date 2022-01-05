import { React } from 'react'
import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

const EditableRow = ({ userInfo }) => {
  return (
    <tr>
      <td>
        <Form.Control
          sm="6"
          type="text"
          value={userInfo.nomina}
        />
      </td>
      <td>
        <Form.Control
          sm="6"
          type="text"
          value={userInfo.nombre}
        />
      </td>
      <td>
        <Form.Control
          sm="6"
          type="text"
          value={userInfo.departamento}
        />
      </td>
      <td>
        <Form.Control
          sm="6"
          type="text"
          value={userInfo.asistencia}
        />
      </td>
      <td>
        <Form.Control
          sm="6"
          type="text"
          value={userInfo.promedio}
        />
      </td>
      <td>
        <Button variant="info">
          <FontAwesomeIcon icon={faSave} />
        </Button>
      </td>
    </tr>
  )
}

export default EditableRow
