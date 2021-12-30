<?php
header("Access-Control-Allow-Origin: *");
$dsn = "mysql:host=localhost;dbname=bitacora_gasolina";
$user = "root";
$pwd = "";
try {
    $bd = new PDO($dsn, $user, $pwd);
} catch (PDOException $e) {
    echo "Error db";
    die();
}

//LOGIN
if ($_POST["option"] == "loginQuery") {
    $sql = "SELECT * FROM usuarios WHERE userName = :userName AND passwordUser = :passwordUser";
    $statement = $bd->prepare($sql);

    $statement->bindParam(":userName", $_POST["userName"]);
    $statement->bindParam(":passwordUser", $_POST["passwordUser"]);
    $statement->execute();

    if ($statement->rowCount() >= 1) {
        echo json_encode(["login" => true]);
    } else {
        echo json_encode(["login" => false]);
    }
}

//Consultar usuario en modulo de caseta
if ($_POST["option"] == "selectEmpleado") {
    $array = [];
    $x = 0;
    $sql = "SELECT nombre, foto, departamento FROM empleados WHERE nomina = :nomina";
    $statement = $bd->prepare($sql);

    $statement->bindParam(":nomina", $_POST["nomina"]);
    $statement->execute();
    
    if ($statement->rowCount() >= 1) {
        while ($row = $statement->fetch()) {
            $array[$x]["nombre"] = $row["nombre"];
            $array[$x]["foto"] = $row["foto"];
            $array[$x]["departamento"] = $row["departamento"];
            $x++;
            echo json_encode([
                "info" => true,
                "name" => $row["nombre"],
                "picture" => $row["foto"],
                "deparment" => $row["departamento"],
            ]);
        }
    } else {
        echo json_encode(["info" => false]);
    }
    
    $sql = "INSERT INTO registros (numNomina) VALUES (:nomina)";
    $statement = $bd->prepare($sql);
    
    $statement->bindParam(":nomina", $_POST["nomina"]);
    $statement->execute();
}

//Agregar nuevos usuarios
if ($_POST["option"] == "insertUser") {
    $sql =
        "INSERT INTO empleados (nomina, nombre, foto, departamento) VALUES (:nomina, :nombre, :foto, :departamento)";
    $statement = $bd->prepare($sql);

    $statement->bindParam(":nomina", $_POST["nomina"]);
    $statement->bindParam(":nombre", $_POST["nombre"]);
    $statement->bindParam(":foto", $_POST["foto"]);
    $statement->bindParam(":departamento", $_POST["departamento"]);
    $statement->execute();

    if ($statement->rowCount() >= 1) {
        echo json_encode(["insert" => true]);
    } else {
        echo json_encode(["insert" => false]);
    }
}

//Mostrar info de los empleados en el dashboard
if ($_POST["option"] == "selectUser") {
    $array = [];
    $x = 0;

    $sql = "SELECT empleados.nomina, empleados.departamento, empleados.nombre, registros.fechaEntrada, registros.fechaSalida FROM empleados JOIN registros ON registros.numNomina = empleados.nomina WHERE empleados.nomina = :nomina";
    
    $statement = $bd->prepare($sql);

    $statement->bindParam(":nomina", $_POST["nomina"]);
    $statement->execute();

    if ($statement->rowCount() >= 1) {
        while ($row = $statement->fetch()) {
            $array[$x]["id"] = $x;
            $array[$x]["nomina"] = $row["nomina"];
            $array[$x]["departamento"] = $row["departamento"];
            $array[$x]["nombre"] = $row["nombre"];
            $array[$x]["fechaEntrada"] = $row["fechaEntrada"];
            $array[$x]["fechaSalida"] = $row["fechaSalida"];
            $x++;
        }
        echo json_encode($array);
    } else {
        echo json_encode(["user" => false]);
    }
}
?>
