import { React } from 'react'
import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const DeleteRow = ({ userInfo, handleDeleteClick}) => {
  return (
    <tr key={userInfo.id}>
    <td>{userInfo.nomina}</td>
    <td>{userInfo.nombre}</td>
    <td>{userInfo.departamento}</td>
    <td>
      <Button variant="danger" onClick={(e) => handleDeleteClick(e, userInfo)}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </td>
  </tr>
  )
}

export default DeleteRow
