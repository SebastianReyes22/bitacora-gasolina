import { React } from 'react'
import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleEditFormSubmit,
}) => {
  return (
    <tr>
      <td>
        <Form.Control
          name="nomina"
          sm="6"
          type="text"
          value={editFormData.nomina}
        />
      </td>
      <td>
        <Form.Control
          name="nombre"
          sm="6"
          type="text"
          value={editFormData.nombre}
        />
      </td>
      <td>
        <Form.Control
          name="departamento"
          sm="6"
          type="text"
          value={editFormData.departamento}
        />
      </td>
      <td>
        <Form.Control
          name="asistencia"
          sm="6"
          type="text"
          value={editFormData.asistencia}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <Form.Control
          name="promedio"
          sm="6"
          type="text"
          value={editFormData.promedio}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <Button variant="info" onClick={handleEditFormSubmit}>
          <FontAwesomeIcon icon={faSave} />
        </Button>
      </td>
    </tr>
  )
}

export default EditableRow
