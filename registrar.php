<?php
// Conectar a la base de datos (ajusta estos valores según tu configuración)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mariobros";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Recibir datos del formulario
$nombre = $_POST['nombre'];
$contrasena = $_POST['contrasena'];

// Insertar datos en la base de datos (ajusta según tus columnas)
$sql = "INSERT INTO usuarios (nombre, contrasena) VALUES ('$nombre', '$contrasena')";

if ($conn->query($sql) === TRUE) {
    echo "Registro exitoso";
} else {
    echo "Error al registrar: " . $conn->error;
}

$conn->close();
?>
