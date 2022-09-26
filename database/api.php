<?php
header('Access-Control-Allow-Origin: *');
$dsn = 'mysql:host=localhost;dbname=bitacora_gasolina';
$user = 'root';
$pwd = '';
try {
  $bd = new PDO($dsn, $user, $pwd);
} catch (PDOException $e) {
  echo 'Error db';
  die();
}

//LOGIN
if ($_POST['option'] == 'loginQuery') {
  $sql =
    'SELECT * FROM usuarios WHERE userName = :userName AND passwordUser = :passwordUser';
  $statement = $bd->prepare($sql);

  $statement->bindParam(':userName', $_POST['userName']);
  $statement->bindParam(':passwordUser', $_POST['passwordUser']);
  $statement->execute();

  if ($statement->rowCount() >= 1) {
    echo json_encode(['login' => true]);
  } else {
    echo json_encode(['login' => false]);
  }
}

//Consultar usuario en modulo de caseta
if ($_POST['option'] == 'selectEmpleado') {
  $array = [];
  $x = 0;
  // $sql = 'SELECT nombre, foto, departamento FROM empleados WHERE nomina = :nomina;';
  $sql =
    'SELECT nomina, nombre, foto, departamento, COUNT(date) AS "cuenta" FROM empleados INNER JOIN registros WHERE empleados.nomina = :nomina AND date = :date AND registros.numNomina = :nomina;';

  $statement = $bd->prepare($sql);
  $statement->bindParam(':nomina', $_POST['nomina']);
  $statement->bindParam(':date', $_POST['date']);
  $statement->execute();

  if ($statement->rowCount() >= 1) {
    while ($row = $statement->fetch()) {
      $array[$x]['nomina'] = $row['nomina'];
      $array[$x]['nombre'] = $row['nombre'];
      $array[$x]['foto'] = $row['foto'];
      $array[$x]['departamento'] = $row['departamento'];
      $array[$x]['cuenta'] = $row['cuenta'];
      $x++;

      if ($row['nomina'] != null) {
        if ($row['cuenta'] == 0) {
          $sql =
            'INSERT INTO registros (numNomina, date) VALUES (:nomina, :date);';
          $statement = $bd->prepare($sql);
          $statement->bindParam(':nomina', $_POST['nomina']);
          $statement->bindParam(':date', $_POST['date']);
          $statement->execute();
          echo json_encode([
            'info' => true,
            'name' => $row['nombre'],
            'picture' => $row['foto'],
            'deparment' => $row['departamento'],
            'message' => 'Ususario registrado correctamente',
          ]);
        } else {
          echo json_encode([
            'message' => 'ERROR: Usuario registrado el día de hoy',
          ]);
        }
      } else {
        echo json_encode(['message' => 'ERROR: Usuario no registrado']);
      }
    }
  }
}

//Agregar nuevos usuarios
if ($_POST['option'] == 'insertUser') {
  $sql =
    'INSERT INTO empleados (nomina, nombre, foto, departamento) VALUES (:nomina, :nombre, :foto, :departamento)';
  $statement = $bd->prepare($sql);

  $statement->bindParam(':nomina', $_POST['nomina']);
  $statement->bindParam(':nombre', $_POST['nombre']);
  $statement->bindParam(':foto', $_POST['foto']);
  $statement->bindParam(':departamento', $_POST['departamento']);
  $statement->execute();

  if ($statement->rowCount() >= 1) {
    echo json_encode(['insert' => true]);
  } else {
    echo json_encode(['insert' => false]);
  }
}

//Mostrar info de los empleados en el dashboard
if ($_POST['option'] == 'selectUser') {
  $array = [];
  $x = 0;

  $sql = "SELECT empleados.nomina, empleados.departamento, empleados.nombre, registros.date 
    FROM empleados JOIN registros ON empleados.nomina = registros.numNomina
    WHERE registros.date BETWEEN :startDate AND :endDate AND empleados.nomina LIKE CONCAT('%', :nomina '%') AND empleados.nombre 
    LIKE CONCAT('%', :userName, '%') AND empleados.departamento LIKE CONCAT('%', :department, '%') ORDER BY registros.date";

  $statement = $bd->prepare($sql);

  $statement->bindParam(':startDate', $_POST['startDate']);
  $statement->bindParam(':endDate', $_POST['endDate']);
  $statement->bindParam(':nomina', $_POST['nomina']);
  $statement->bindParam(':userName', $_POST['userName']);
  $statement->bindParam(':department', $_POST['department']);
  $statement->execute();

  if ($statement->rowCount() >= 1) {
    while ($row = $statement->fetch()) {
      $array[$x]['id'] = $x;
      $array[$x]['nomina'] = $row['nomina'];
      $array[$x]['departamento'] = $row['departamento'];
      $array[$x]['nombre'] = $row['nombre'];
      $array[$x]['date'] = $row['date'];
      $x++;
    }
    echo json_encode($array);
  } else {
    echo json_encode(['user' => false]);
  }
}

//Obtiene un array con los los datos de los empleados y su promedio de asistencia del mes solicitado
if ($_POST['option'] == 'getReports') {
  $array = [];
  $x = 0;

  $sql = "SELECT empleados.nomina, empleados.nombre, empleados.departamento, asistencia, promedio 
                FROM (SELECT empleados.nomina, empleados.nombre, empleados.departamento, 
                COUNT(registros.date) AS asistencia, (COUNT(registros.date) / 30 * 100) 
                AS promedio FROM empleados INNER JOIN registros ON empleados.nomina = registros.numNomina 
                WHERE registros.date BETWEEN :startDate AND :endDate 
                GROUP BY empleados.nomina, empleados.nombre, registros.numNomina) 
            empleados 
            GROUP BY empleados.nomina, empleados.nombre";

  $statement = $bd->prepare($sql);

  $statement->bindParam(':startDate', $_POST['startDate']);
  $statement->bindParam(':endDate', $_POST['endDate']);
  $statement->execute();

  if ($statement->rowCount() >= 1) {
    while ($row = $statement->fetch()) {
      $array[$x]['id'] = $x;
      $array[$x]['nomina'] = $row['nomina'];
      $array[$x]['nombre'] = $row['nombre'];
      $array[$x]['departamento'] = $row['departamento'];
      $array[$x]['asistencia'] = $row['asistencia'];
      $array[$x]['promedio'] = $row['promedio'];
      $x++;
    }
    echo json_encode($array);
  } else {
    echo json_encode(['user' => false]);
  }
}

//DELETE USER
if ($_POST['option'] == 'deleteUser') {
  $sql = 'DELETE FROM empleados WHERE nomina = :nomina';
  $statement = $bd->prepare($sql);

  $statement->bindParam(':nomina', $_POST['nomina']);
  $statement->execute();

  if ($statement->rowCount() >= 1) {
    echo json_encode(['delete' => true]);
  } else {
    echo json_encode(['delete' => false]);
  }
}

//Buscar usuario para eliminar
if ($_POST['option'] == 'selectUserDelete') {
  $array = [];
  $x = 0;

  $sql =
    "SELECT * FROM empleados WHERE nomina LIKE CONCAT('%', :nomina '%') AND nombre LIKE CONCAT('%', :userName, '%') AND departamento LIKE CONCAT('%', :department, '%') ORDER BY nomina";

  $statement = $bd->prepare($sql);

  $statement->bindParam(':nomina', $_POST['nomina']);
  $statement->bindParam(':userName', $_POST['userName']);
  $statement->bindParam(':department', $_POST['department']);
  $statement->execute();

  if ($statement->rowCount() >= 1) {
    while ($row = $statement->fetch()) {
      $array[$x]['id'] = $x;
      $array[$x]['nomina'] = $row['nomina'];
      $array[$x]['nombre'] = $row['nombre'];
      $array[$x]['departamento'] = $row['departamento'];
      $x++;
    }
    echo json_encode($array);
  } else {
    echo json_encode(['userDelete' => false]);
  }
}

?>
