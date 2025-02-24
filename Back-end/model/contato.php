<?php
function getAllContatos($conn) {
    $sql = "SELECT * FROM contatos";
    $result = mysqli_query($conn, $sql);
    
    if (!$result) {
        die(json_encode(["error" => "Erro na consulta SQL: " . mysqli_error($conn)]));
    }

    $contatos = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $contatos[] = $row;
    }

    return $contatos;
}

function createContato($conn, $nome, $data_nascimento, $email, $profissao, $telefone, $celular, $possui_whatsapp, $notificacoes_email, $notificacoes_sms) {
    $sql = "INSERT INTO contatos (nome, data_nascimento, email, profissao, telefone, celular, possui_whatsapp, notificacoes_email, notificacoes_sms) VALUES ('$nome', '$data_nascimento', '$email', '$profissao', '$telefone', '$celular', '$possui_whatsapp', '$notificacoes_email', '$notificacoes_sms')";
    $result = mysqli_query($conn, $sql);
    if (!$result) {
        die(json_encode(["error" => "Erro ao adicionar contato: " . mysqli_error($conn)]));
    }

    return mysqli_insert_id($conn);
}

function updateContato($conn, $id, $nome, $data_nascimento, $email, $profissao, $telefone, $celular, $possui_whatsapp, $notificacoes_email, $notificacoes_sms) {
    $sql = "UPDATE contatos SET nome='$nome', data_nascimento='$data_nascimento', email='$email', profissao='$profissao', telefone='$telefone', celular='$celular', possui_whatsapp='$possui_whatsapp', notificacoes_email='$notificacoes_email', notificacoes_sms='$notificacoes_sms' WHERE id=$id";
    $result = mysqli_query($conn, $sql);
    
    if (!$result) {
        die(json_encode(["error" => "Erro ao atualizar contato: " . mysqli_error($conn)]));
    }

    return mysqli_affected_rows($conn) > 0;
}

function deleteContato($conn, $id) {
    $sql = "DELETE FROM contatos WHERE id=$id";
    $result = mysqli_query($conn, $sql);
    
    if (!$result) {
        die(json_encode(["error" => "Erro ao deletar contato: " . mysqli_error($conn)]));
    }

    return mysqli_affected_rows($conn) > 0;
}
?>
