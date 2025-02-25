<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");


$request_uri = explode("/", trim($_SERVER["REQUEST_URI"], "/"));
$method = $_SERVER["REQUEST_METHOD"];

if ($request_uri[0] === "contatos") {
    include("./controller/controller_contatos.php");

    switch ($method) {
        case "GET":
            getContatos();
            break;
        case "POST":
            createContatoHandler();
            break;
        case "PUT":
            updateContatoHandler();
            break;
        case "DELETE":
            deleteContatoHandler();
            break;
        default:
            echo json_encode(["error" => "Método não permitido"]);
            break;
    }
} else {
    http_response_code(404);
    echo json_encode(["error" => "Rota não encontrada"]);
}
?>