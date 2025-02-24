<?php
$db_server = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "database_alphacode";


try {
    $conn = mysqli_connect($db_server, $db_user, $db_pass, $db_name);
    if (!$conn) {
        throw new Exception("Erro na conexão com o banco de dados");
    }
} catch (Exception $e) {
    die("Erro: " . $e->getMessage());
}

?>