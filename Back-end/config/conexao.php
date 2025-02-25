<?php
$config = require(__DIR__ . '/credentials.php');

$db_server = $config['host'];
$db_user = $config["user"];
$db_pass = $config['pass'];
$db_name = $config['dbname'];


try {
    $conn = mysqli_connect($db_server, $db_user, $db_pass, $db_name);
    if (!$conn) {
        throw new Exception("Erro na conexão com o banco de dados: " . mysqli_connect_error());
    }
} catch (Exception $e) {
    die("Erro: " . $e->getMessage());
}
?>
