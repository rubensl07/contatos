<?php
require_once(__DIR__ . '/../config/conexao.php');
require_once(__DIR__ . '/../model/contato.php');

header('Content-Type: application/json');

function getContatos() {
    global $conn;
    
    $contatos = getAllContatos($conn);
    
    if (isset($contatos['error'])) {
        echo json_encode(["error" => $contatos['error']]);
        return;
    }
    
    echo json_encode($contatos ?: []);
}


function createContatoHandler() {
    global $conn;
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['nome'], $data['data_nascimento'], $data['email'], $data['profissao'], 
                $data['telefone'], $data['celular'], $data['possui_whatsapp'], 
                $data['notificacoes_email'], $data['notificacoes_sms'])) {
        echo json_encode(["error" => "Dados incompletos"]);
        return;
    }

    $result = createContato($conn, $data['nome'], $data['data_nascimento'], $data['email'], 
                            $data['profissao'], $data['telefone'], $data['celular'], 
                            $data['possui_whatsapp'], $data['notificacoes_email'], 
                            $data['notificacoes_sms']);

    echo json_encode($result ? ["success" => "Contato adicionado", "id" => $result] : ["error" => "Erro ao adicionar contato"]);
}

function updateContatoHandler() {
    global $conn;
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['id'], $data['nome'], $data['data_nascimento'], $data['email'], $data['profissao'], 
                $data['telefone'], $data['celular'], $data['possui_whatsapp'], 
                $data['notificacoes_email'], $data['notificacoes_sms'])) {
        echo json_encode(["error" => "Dados incompletos"]);
        return;
    }

    $result = updateContato($conn, $data['id'], $data['nome'], $data['data_nascimento'], $data['email'], 
                            $data['profissao'], $data['telefone'], $data['celular'], 
                            $data['possui_whatsapp'], $data['notificacoes_email'], 
                            $data['notificacoes_sms']);

    echo json_encode($result ? ["success" => "Contato atualizado"] : ["error" => "Erro ao atualizar contato"]);
}

function deleteContatoHandler() {
    global $conn;
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['id'])) {
        echo json_encode(["error" => "ID não informado"]);
        return;
    }

    $result = deleteContato($conn, $data['id']);
    echo json_encode($result ? ["success" => "Contato deletado"] : ["error" => "Erro ao deletar contato"]);
}
?>
