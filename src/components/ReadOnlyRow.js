import { React } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const ReadOnlyRow = ({ userInfo, handleEditClick }) => {
  return (
    <tr key={userInfo.id}>
      <td>{userInfo.nomina}</td>
      <td>{userInfo.nombre}</td>
      <td>{userInfo.departamento}</td>
      <td>{userInfo.asistencia}</td>
      <td>{userInfo.promedio}</td>
      <td>
        <Button variant='warning' onClick={e => handleEditClick(e, userInfo)}>
          <FontAwesomeIcon icon={faPencilAlt} />
        </Button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
